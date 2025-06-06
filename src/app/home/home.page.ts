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

  side_menu:any = [
    {
      icon: 'home-outline',
      name: 'Página Inicial',
      selected: true
    },
    {
      icon: 'cart-outline',
      name: 'Produtos',
      selected: false
    },
    {
      icon: 'people-outline',
      name: 'Clientes',
      selected: false
    },
    {
      icon: 'call-outline',
      name: 'Contatos',
      selected: false
    },
  ]

  constructor(){

  }
}
