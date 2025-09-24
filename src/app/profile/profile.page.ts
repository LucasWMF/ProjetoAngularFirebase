import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { HttpErrorResponse } from "@angular/common/http";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user: any = null;
  posts: any[] = [];
  editarPerfil: boolean = false;
  baseUrl: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastCtrl: ToastController,
    private postService: PostService
  ) {
    this.baseUrl = this.api.baseUrl.replace("/api", "");
  }

  ngOnInit() {
    this.loadPerfil();
  }

  loadPerfil() {
    const baseUrl = "http://127.0.0.1:8000";

    this.api.get("usuario/perfil").subscribe({
      next: (resp: any) => {
        if (!resp) {
          this.router.navigate(["/login"]);
          return;
        }

        resp.picture =
          resp.picture && resp.picture.startsWith("http")
            ? resp.picture
            : baseUrl + resp.picture;

        this.user = resp;
        this.loadPosts();
      },
      error: () => {
        this.router.navigate(["/login"]);
      },
    });
  }

  loadPosts() {
    const userId = localStorage.getItem("user_id"); // pega id do usuário logado

    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = (data || []).filter(
          (p) => String(p.user_id) === String(userId)
        );
      },
      error: (err) => console.error("Erro ao carregar posts", err),
    });
  }

  salvarAlteracoes() {
    if (!this.user) return;

    const payload: any = {
      name: this.user.name,
      email: this.user.email,
    };

    this.api.put(`usuario/${this.user.id}`, payload).subscribe({
      next: (resp: any) => {
        this.user = resp.user;
        this.editarPerfil = false;
        this.showToast("Alterações feitas com sucesso! :)");
      },
      error: () => {
        this.showToast("Erro ao salvar alterações. Tente novamente :(");
      },
    });
  }

  uploadFoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      this.showToast("Por favor, selecione uma imagem válida. :)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.showToast("Imagem muito grande. Máximo 2MB. :(");
      return;
    }

    const formData = new FormData();
    formData.append("picture", file);

    this.api.post("usuario/foto-upload", formData).subscribe({
      next: (resp: any) => {
        this.user.picture = resp.picture_url.startsWith("http")
          ? resp.picture_url
          : this.baseUrl + resp.picture_url;

        this.showToast("Foto atualizada com sucesso! :)");
      },
      error: (err: HttpErrorResponse) => {
        console.error("Erro ao enviar foto:", err);
        if (err.status === 422) {
          this.showToast("Erro: Imagem inválida ou muito grande. :(");
        } else {
          this.showToast("Erro ao enviar foto. Tente novamente. :(");
        }
      },
    });
  }

  logout() {
    this.api.post("usuario/logout", {}).subscribe({
      next: () => this.router.navigate(["/login"]),
      error: () => this.router.navigate(["/login"]),
    });
  }

  async showToast(msg: string, color: string = "primary") {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: "top",
    });
    toast.present();
  }
}
