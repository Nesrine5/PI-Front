import { Injectable, NgZone } from '@angular/core';
import RecordRTC from 'recordrtc';
import * as moment from "moment";

import { Observable, Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

interface RecordedVideoOutput {
  blob: Blob;
  url: string;
  title: string;
}

@Injectable()
export class VideoRecordingService {

  private stream;
  private recorder;
  private interval;
  private startTime;
  private _stream = new Subject<MediaStream>();
  private _recorded = new Subject<RecordedVideoOutput>();
  private _recordedUrl = new Subject<string>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  recordingInterval: NodeJS.Timer;


  getRecordedUrl(): Observable<string> {
    return this._recordedUrl.asObservable();
  }
  
  getRecordedBlob(): Observable<RecordedVideoOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  getStream(): Observable<MediaStream> {
    return this._stream.asObservable();
  }

  startRecording(conf: any): Promise<any> {
    var browser = <any>navigator;
    if (!this.recorder) {
      // Initialize start time
      const startTime = Date.now();
  
      // Function to update recording time
      const updateRecordingTime = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const minutes = Math.floor(elapsedTime / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
       
      };
  
      this._recordingTime.next('00:00');
      return new Promise((resolve, reject) => {
        browser.mediaDevices.getUserMedia(conf)
          .then(stream => {
            this.stream = stream;
            this.record();
            // Update recording time every second
            this.recordingInterval = setInterval(updateRecordingTime, 1000);
            resolve(this.stream);
          })
          .catch(error => {
            this._recordingFailed.next("");
            reject(error);
          });
      });
    } else {
      // Recording is already started or in progress
      return Promise.reject(new Error("Recording is already started or is in progress."));
    }
  }
  

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC(this.stream, {
      type: 'video',
      mimeType: 'video/webm',
      bitsPerSecond: 44000
    });
    this.recorder.startRecording();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this._recordingTime.next(time);
        this._stream.next(this.stream);
      },
      500
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  /*stopRecording() {
    if (this.recorder) {
      this.recorder.stopRecording(this.processVideo.bind(this));
      //this.processVideo.bind(this.recorder)
      //this.processVideo(this.recorder);
      //this.stopMedia();
    }
  }
*/
 stopRecording() {
  if (this.recorder) {
    this.recorder.stopRecording((recordedBlob: Blob) => {
      // Process the recorded blob
      this.processVideo(recordedBlob);
    }, (error: any) => {
      console.error('Error stopping recording:', error);
      // Handle error if necessary
    });
  }
}


  private processVideo(audioVideoWebMURL) {
    // console.log(audioVideoWebMURL);
    const recordedBlob = this.recorder.getBlob();
    this.recorder.getDataURL(function (dataURL) { });
    const recordedName = encodeURIComponent('video_' + new Date().getTime() + '.webm');
    this._recorded.next({ blob: recordedBlob, url: audioVideoWebMURL, title: recordedName });
    this.stopMedia();
    //this.recorder.save(recordedName);
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream.getVideoTracks().forEach(track => track.stop());
        this.stream.stop();
        this.stream = null;
      }
    }
  }
}
