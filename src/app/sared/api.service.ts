import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://127.0.0.1:8000/api'; // produção
  // private readonly baseUrl = 'http://127.0.0.1:agora/'; // desenvolvimento

  isLoading = false;
  handlerMessage = '';
  roleMessage = '';

  constructor(private http: HttpClient) {}

  // headers padrão
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * POST - Cria um novo registro
   * @param endpoint - ex: "users"
   * @param data - objeto a ser enviado
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.jsonHeaders,
    });
  }

  /**
   * PUT - Atualiza um registro
   * @param endpoint - ex: "users/1"
   * @param data - objeto atualizado
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.jsonHeaders,
    });
  }

  /**
   * DELETE - Remove um registro
   * @param endpoint - ex: "users/1"
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }

  /**
   * GET - Busca dados (um ou todos)
   * @param endpoint - ex: "users" ou "users/1"
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }
}