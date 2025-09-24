import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../shared/api.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"],
})
export class LoginPage {
  usuario: any = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  modoRegistro: boolean = false; // inicia no login

  constructor(
    private api: ApiService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async showToast(msg: string, color: string = "primary") {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: "top",
    });
    await toast.present();
  }

  // Login
  loginUsuario() {
    this.api
      .post("usuario/login", {
        email: this.usuario.email,
        password: this.usuario.password,
      })
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          localStorage.setItem("token", resp.token);
          this.showToast("Login realizado com sucesso!", "success");

          // Redireciona para a página de posts
          this.router.navigate(["/posts"]);
        },
        error: (err: any) => {
          console.error("Erro no login:", err);

          // Se o erro indicar email não cadastrado, muda para registro
          if (err.status === 404) {
            this.modoRegistro = true;
            this.showToast(
              "Email não encontrado. Complete o registro!",
              "warning"
            );
          } else {
            this.showToast(
              "Credenciais inválidas. Verifique e tente novamente.",
              "danger"
            );
          }
        },
      });
  }

  // Registro
  registrarUsuario() {
    // validação básica
    if (!this.usuario.email || !this.usuario.password || !this.usuario.name) {
      this.showToast("Preencha todos os campos obrigatórios!", "danger");
      return;
    }
    if (this.usuario.password !== this.usuario.password_confirmation) {
      this.showToast("As senhas não coincidem!", "danger");
      return;
    }

    this.api.post("usuario/registrar-se", this.usuario).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.showToast("Usuário registrado! Agora faça login.", "success");
        this.modoRegistro = false; // volta para login
        this.usuario.password = "";
        this.usuario.password_confirmation = "";
      },
      error: (err: any) => {
        console.error("Erro ao registrar:", err);
        this.showToast(
          "Erro ao registrar o usuário. Tente novamente.",
          "danger"
        );
      },
    });
  }

  // Checar email ao sair do campo
  verificarEmail() {
    if (!this.modoRegistro && this.usuario.email) {
      this.api
        .post("usuario/verificar-email", { email: this.usuario.email })
        .subscribe({
          next: (resp: any) => {
            if (!resp.existe) {
              this.modoRegistro = true; // email não cadastrado, ativa registro
            }
          },
          error: (err: any) => {
            console.error("Erro ao verificar email:", err);
          },
        });
    }
  }

  logout() {
    this.api.post("usuario/logout", {}).subscribe({
      next: () => this.router.navigate(["/login"]),
      error: () => this.router.navigate(["/login"]),
    });
  }
}
