import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs'
import { Livrable } from 'app/models/livrable';
@Injectable({
  providedIn: 'root'
})
export class LivrableService {
  private apiUrl = 'http://localhost:8090/api/livrables'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getAllLivrables(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getLivrableById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  saveLivrable(livrable: any): Observable<any> {
    return this.http.post(this.apiUrl, livrable);
  }

  deleteLivrable(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateLivrable(updatedLivrable: Livrable): Observable<any> {
    const url = `${this.apiUrl}/livrables/${updatedLivrable.idLivrable}`; // Adjust the URL based on your backend API

    // Assuming your backend supports HTTP PUT for updating resources
    return this.http.put(url, updatedLivrable);
  }
  saveLivrableAndAddIDLivrableAndIdBesoinInEnovation(livrable: Livrable, besoinId: number): Observable<Livrable> {
    const url = `${this.apiUrl}/addLivrable/${besoinId}`;
    return this.http.post<Livrable>(url, livrable)
       .pipe(
          catchError(error => {
             console.error('Error in saveLivrableAndAddIDLivrableAndIdBesoinInEnovation:', error);
             throw error;
          })
       );
 }
 
  

}