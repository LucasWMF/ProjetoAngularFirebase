import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home-routing.module';
import { ProfilePage } from './profile/profile-routing.module';
import { LoginPage } from './login/login-routing.module';
import { RegisterPage } from './register/register-routing.module';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'profile', component: ProfilePage },
  { path: 'login', component: LoginPage },
  { path: 'registrar', component: RegisterPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
