import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  user_id: number;
  content: string;
  user_name: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8000/api'; // URL da sua API Laravel

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  createPost(content: string): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, { content });
  }

  getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/users/${userId}/posts`);
  }
}
