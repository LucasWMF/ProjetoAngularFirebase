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

  perfil: any = {
    foto: null,
    nome: null,
    profissao: null,
    nome_usuario: null,
    idioma: null,
    localidade: null,
    data_inicio: null,
    biografia:null,
    estatisticas: {
      curtidas: 0,
      seguindo: 0,
      amigos: 0
    },
    postagens: [
        {
          "foto": "https://cdn.pensador.com/img/temas/fr/as/frases_para_desejar_um_bom_dia.jpg?class=ogImageWide",
          "nome": "Lucas Wagner de Melo Fogaça",
          "nome_usuario": "@lucaswmf",
          "texto": "Hoje é dia de refletir sobre os aprendizados dessa semana! E você, já pensou no que aprendeu até agora?",
          "data": "12/03/2025 16:10"
        },
        {
          "foto": "https://cdn.pensador.com/img/frase/qu/ot/quot_a_vida_e_feita_de_escolhas_limpe_os_pes_ou_esfregue_o_chao_quot_trf_nlp135y3.jpg",
          "nome": "Lucas Wagner de Melo Fogaça",
          "nome_usuario": "@lucaswmf",
          "texto": "A vida é feita de escolhas. Estamos constantemente decidindo o nosso caminho. E você, qual escolha vai fazer hoje?",
          "data": "12/03/2025 16:10"
        },
        {
          "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb50WLT8vXSQTkPkc8kW12sKr26T_aLKI29GV5yaDvGHFcIlGg0RpICBK5vAahJe5yTW0&usqp=CAU",
          "nome": "Lucas Wagner de Melo Fogaça",
          "nome_usuario": "@lucaswmf",
          "texto": "Nada como um bom café para começar a tarde com energia renovada! ☕️ Qual sua bebida preferida no meio da tarde?",
          "data": "12/03/2025 16:10"
        },
        {
          "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdRtH9dq-EH1FVcG_sRX3_3_EPG0PHljTznQ&s",
          "nome": "Lucas Wagner de Melo Fogaça",
          "nome_usuario": "@lucaswmf",
          "texto": "Estou acompanhando essa nova série no streaming, e está incrível! Alguém mais assistiu?",
          "data": "12/03/2025 16:10"
        },
        {
          "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5dmm2trDz4IGmwNJaTg8PG8_tY_BaVjp9w&s",
          "nome": "Lucas Wagner de Melo Fogaça",
          "nome_usuario": "@lucaswmf",
          "texto": "Aproveitando a noite para colocar as séries em dia e relaxar. Às vezes, um bom descanso é tudo o que precisamos!",
          "data": "12/03/2025 16:10"
        }
      ]          
  }

  constructor(
   ){ }
  
}
