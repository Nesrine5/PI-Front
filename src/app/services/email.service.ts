import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailRequest } from 'app/models/EmailRequest';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8090/api/email/send';

  constructor(private http: HttpClient) {}

  sendEmail(emailRequest: EmailRequest): Observable<string> {
    return this.http.post<string>(this.apiUrl, emailRequest);
  }
}
