import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Evaluation } from 'app/models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:8090/evaluations'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.apiUrl);
  }

  getEvaluationById(id: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.apiUrl}/${id}`);
  }

  createEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.apiUrl, evaluation);
  }

  updateEvaluation(id: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.put<Evaluation>(`${this.apiUrl}/${id}`, evaluation);
  }

  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  acceptEvaluation(evaluationId: number): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/accept`;

    return this.http.put(url, null, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }
  refuserEvaluation(evaluationId: number): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/refuser`;

    return this.http.put(url, null, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
  updateRating(id: number, newRating: number): Observable<Evaluation> {
    const updatedEvaluation = { starRating: newRating }; // Sending only the updated property
    return this.http.put<Evaluation>(`${this.apiUrl}/rating/${id}`, updatedEvaluation);
}
filterByEtat(etat: string): Observable<Evaluation[]> {
  return this.http.get<Evaluation[]>(`${this.apiUrl}/filterByEtat/${etat.toString().toUpperCase()}`);
}
}