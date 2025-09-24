import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ApiService } from "../shared/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  usuarioLogado: boolean = false;
  posts: any[] = [];

  constructor(private router: Router, private api: ApiService) {}

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

  loadPosts() {
    this.api.get<any[]>("usuario/posts").subscribe({
      next: (data) => {
        // filtra apenas posts do usuário se quiser
        this.posts = data.filter(
          (p) => String(p.user_id) === String(localStorage.getItem("user_id"))
        );
      },
      error: (err) => {
        console.error("Erro ao carregar posts", err);
        this.posts = [];
      },
    });
  }
}
