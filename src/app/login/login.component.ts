import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/sared/api.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      this.apiService.post('login', this.loginForm.value).subscribe({
        next: async (res) => {
          const toast = await this.toastCtrl.create({
            message: 'Login realizado com sucesso!',
            duration: 2000,
            color: 'success',
          });
          toast.present();
          this.navCtrl.navigateRoot('/dashboard');
        },
        error: async (err) => {
          const toast = await this.toastCtrl.create({
            message: 'Erro no login. Verifique suas credenciais.',
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        },
      });
    }
  }
}