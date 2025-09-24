import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "http://127.0.0.1:8000/api/usuario";

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Pega todos os posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`, {
      headers: this.getHeaders(),
    });
  }

  // Cria post (sem subscribe aqui!)
  createPost(description: string, picture: string = ""): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/posts`,
      { description, picture },
      { headers: this.getHeaders() }
    );
  }
}