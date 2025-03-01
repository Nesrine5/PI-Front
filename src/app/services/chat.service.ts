import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8090/api/chat';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send`, { message });
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages`);
  }
}
