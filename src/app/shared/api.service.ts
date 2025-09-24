// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    const token = localStorage.getItem('token'); // pega token
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.get<T>(this.baseUrl + endpoint, { headers });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.post<T>(this.baseUrl + endpoint, body, { headers });
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.put<T>(this.baseUrl + endpoint, body, { headers });
  }
}
