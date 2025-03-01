import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from 'app/models/chat/message';
import { AudioRecordingService } from 'app/services/AudioRecordingService';
import { AudioRecordingServicee } from 'app/services/audio-recording.service';
import { VideoRecordingService } from 'app/services/video-recording.service';
import * as Chartist from 'chartist';
import Recorder from 'recorder-js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  shareData: ShareData = {
    url: 'https://github.com/husseinAbdElaziz',
    description: 'dev',
    tags: 'hussein_AbdElaziz',
  };

  shareLinks: ShareLinks[] = [
    {
      title: 'fb',
      link: `https://www.facebook.com/sharer.php?u=${this.shareData?.url}`,
    },
    {
      title: 'twitter',
      link: `https://twitter.com/intent/tweet?url=${this.shareData?.url}&text=${this.shareData?.description}&hashtags=${this.shareData?.tags}`,
    },
    {
      title: 'pinterest',
      link: `http://pinterest.com/pin/create/link/?url=${this.shareData?.url}`,
    },
    {
      title: 'whatsapp',
      link: `https://wa.me?text=${this.shareData?.url}`,
    },
    {
      title: 'send to 00201012345678',
      link: 'https://wa.me/+201012345678',
    },
  ];







  @ViewChild('videoElement') videoElement: any;
  video: any;
  audit: any;
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime;
  videoRecordedTime;
  audioBlobUrl;
  videoBlobUrl;
  audioBlob;
  videoBlob;
  audioName;
  videoName;
  audioStream;
  videoStream: MediaStream;
  audioConf = { audio: true}
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true}
  recorder;

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingServicee,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer
  ) {

    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      this.ref.detectChanges();
    });

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
 });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.audioBlob = data.blob;
      this.audioName = data.title;
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    // Initialize the video element
    this.video = this.videoElement.nativeElement;
  }
  ngAfterViewInit() {
    // Initialize the video element after it's been rendered
    this.video = this.videoElement.nativeElement;
  }
  
  startVideoRecording() {
    if (!this.isVideoRecording) {
      // Ensure that this.video is defined before accessing its properties
      if (this.video) {
        this.video.controls = true; // Set controls property to true
        this.isVideoRecording = true;
        this.videoRecordingService.startRecording(this.videoConf)
          .then(stream => {
            this.video.srcObject = stream;
            this.video.play();
          })
          .catch(function (err) {
            console.log(err.name + ": " + err.message);
          });
      } else {
        console.error('Video element is not defined.');
      }
    }
  
  }
  

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.video.controls = false;
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
    }
  }

  clearVideoRecordedData() {
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.ref.detectChanges();
  }

  downloadVideoRecordedData() {
    this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
  }
/* 
  startAudioRecording() {
   if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }*/
 
  startAudioRecording() {
    if (!this.isAudioRecording) {
      // Ensure that this.audioRecordingService is defined before accessing its methods
      if (this.audioRecordingService) {
        this.isAudioRecording = true;
        this.audioRecordingService.startRecording();
      } else {
        console.error('Audio recording service is not defined.');
      }
    } else {
      console.error('Audio recording is already in progress.');
    }
  }
  
  
  
  
 
  
    sendMMS() {
      var fileType = 'audio'; // or "audio"
      var fileName = 'abcde.wav';  // or "wav"
      let formData = new FormData();
      formData.append('filename', fileName);
      formData.append('data', this.recorder.getBlob()); // --------- check this line
      this.audioRecordingService.startRecording();
  }
  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
  }

  downloadAudioRecordedData() {
    this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    //this.video.srcObject = stream;
    //const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}



type ShareData = { url: string; description: string; tags: string };
type ShareLinks = { title: string; link: string };
