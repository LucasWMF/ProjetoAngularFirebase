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

  url: string = `https://restcountries.com/v3.1/all?fields=name,flags,borders`;
  is_loading: boolean = false;
  dados: any;

  constructor() {
    fetch(this.url)
      // fetch pesquisa na url
      .then(dados => dados.json())
      .then(dados => {
        console.log(dados);
        this.dados = dados;
      })
      .catch(_ => {
        console.log(_)
      })
      .finally(
        ()=> {
          this.is_loading = false;
          console.log('Requisição Finalizada!');
        }
      )
    // .then sla oq faz e um return
  }

};