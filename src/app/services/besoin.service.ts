import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Besoin } from 'app/models/besoin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BesoinService {

  private baseUrl = 'http://localhost:8090/api/besoins';

  constructor(private http: HttpClient) { }

  getAllBesoins(): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(`${this.baseUrl}/getAll`);
  }

  getBesoinById(idBesoin: number): Observable<Besoin> {
    return this.http.get<Besoin>(`${this.baseUrl}/get?idBesoin=${idBesoin}`);
  }

  addBesoin(besoin: Besoin,UserId: number): Observable<Besoin> {
    return this.http.post<Besoin>(`${this.baseUrl}/add/${UserId}`, besoin);
  }/*
  addBesoina(besoin: FormData): Observable<Besoin> {
    return this.http.post<Besoin>(`${this.baseUrl}/add`, besoin);
  }
  addBesoin(besoin: FormData): Observable<Besoin> {
    const headers = new HttpHeaders();  // Ensure HttpHeaders is imported from '@angular/common/http'
    return this.http.post<Besoin>(`${this.baseUrl}/add`, besoin, { headers });
  }*/
  
  
  updateBesoin(besoin: Besoin): Observable<Besoin> {
    return this.http.put<Besoin>(`${this.baseUrl}/update`, besoin);
  }

  deleteBesoin(idBesoin: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${idBesoin}`);
  }

 
  getBesoinDetails(idBesoin: number): Observable<Besoin> {
    const url = `${this.baseUrl}/get?idBesoin=${idBesoin}`;
    return this.http.get<Besoin>(url);
  }

  updateRating(id: number, newRating: number): Observable<Besoin> {
    const updatedBesoin = { starRating: newRating }; // Sending only the updated property
    return this.http.put<Besoin>(`${this.baseUrl}/rating/${id}`, updatedBesoin);
}
}
