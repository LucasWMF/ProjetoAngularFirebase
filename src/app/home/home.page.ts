import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ApiService } from "../shared/api.service";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  usuarioLogado: boolean = false;
  posts: any[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.verificarLogin();

    // Atualiza status de login a cada mudança de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verificarLogin();
      }
    });

    // Carrega posts
    this.loadPosts();
  }

  verificarLogin() {
    this.usuarioLogado = !!localStorage.getItem("token");
  }

  createPost(description: string, picture: string = "") {
    this.postService.createPost(description, picture).subscribe((newPost) => {
      // garante que this.posts já existe antes de unshift
      if (!this.posts) this.posts = [];
      this.posts.unshift(newPost); // ← aqui pode estar dando erro se this.posts for null
    });
  }

  loadPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts; // ← é aqui que você popula
    });
  }

  getRelativeTime(date: string) {
    return this.postService.getRelativeTime(date);
  }

  getUserColorFile(name: string) {
    return this.postService.getUserColorFile(name);
  }
}
