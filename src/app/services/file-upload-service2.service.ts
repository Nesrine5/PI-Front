import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseFile } from 'app/models/ResponseFile';
import { Files } from 'app/models/files';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService2 {
  private baseUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(UserId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/filesByUserId/${UserId}`);
  }


 /* upload2(file: File , besoinId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/${besoinId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }*/


  upload2(file: File , besoinId: number, UserId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/${besoinId}/${UserId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  updateLivrableNote(fileId: string, newNote: number): Observable<any> {
    const url = `${this.baseUrl}/files/${fileId}/updateLivrableNote?newNote=${newNote}`;
    return this.http.put(url, {});
  }

  getFileById(fileId: string): Observable<Files> {
    const url = `${this.baseUrl}/files/${fileId}`;
    return this.http.get<Files>(url);
  }


}