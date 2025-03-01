import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:8090'; 

  constructor(private http: HttpClient) { }

  downloadImage(fileName: string): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrl}/downloadd/${fileName}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }
}