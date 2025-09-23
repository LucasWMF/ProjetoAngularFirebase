import { Component } from "@angular/core";
import { AuthenticateService } from "../services/auth.service";
import { CrudService } from "../services/crud.service";
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@angular/fire/storage";
import { MessageService } from "../services/message.service";
import { Router } from "@angular/router";
import { ApiService } from "../sared/api.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  usuario: any = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  posts: any[] = [];

  constructor(public apiService: ApiService) {}

  cadastrarUsuario() {
    this.apiService
      .post("usuario/registrar-se", this.usuario)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
