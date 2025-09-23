import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/sared/api.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.registerForm.valid) {
      this.apiService.post('register', this.registerForm.value).subscribe({
        next: async (res) => {
          const toast = await this.toastCtrl.create({
            message: 'Cadastro realizado com sucesso!',
            duration: 2000,
            color: 'success',
          });
          toast.present();
          this.navCtrl.navigateRoot('/login');
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Erro no cadastro. Tente novamente.',
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        },
      });
    }
  }
}
