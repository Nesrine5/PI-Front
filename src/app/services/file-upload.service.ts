import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDetails } from 'app/models/fileDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = "http://localhost:8090"
  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<FileDetails> {

    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileDetails>(`${this.baseUrl}/simple-form-upload-mvc`, formData);
  }


  uploadFile(file: File, livrable: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // You can append other form fields if needed
    formData.append('matricule', livrable.matricule);
    formData.append('nom', livrable.nom);
    // ... other fields

    const headers = new HttpHeaders();
    // Add any required headers

    return this.httpClient.post(`${this.baseUrl}/upload`, formData, { headers });
  }
}