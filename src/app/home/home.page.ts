import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  clientes: any = [];

  constructor(
    public crudService: CrudService
  ) {
    this.getClient();
  }

  getClient() {
    fetch('http://127.0.0.1:8000/api/cliente')
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.clientes = resp;
      });
  }

  // enviar() {
  //   this.crudService.insert(this.pokemon, 'pokemons')
  // }

}
