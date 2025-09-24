import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { formatDistanceToNow, parseISO, format } from "date-fns";

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

  getRelativeTime(date: string): string {
    const postDate = parseISO(date);
    const diffInMinutes = (new Date().getTime() - postDate.getTime()) / 60000;

    if (diffInMinutes > 5) {
      // maior que 5 minutos: mostra data completa
      return format(postDate, "dd/MM/yyyy HH:mm");
    } else {
      // menor que 5 minutos: tempo relativo
      return formatDistanceToNow(postDate, { addSuffix: true });
    }
  }
  
  getUserColorFile(name: string): string {
    const colorFiles = [
      "roxo.png",
      "azul.png",
      "amarelo.png",
      "laranja.png",
      "verde.png",
    ];
    const index = name.length % colorFiles.length;
    return `assets/img/${colorFiles[index]}`;
  }
}
