import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
    pathMatch: 'full',
  },
  {
    path: 'Register',
    component: RegisterComponent,
    title: 'Register',
  },
];
