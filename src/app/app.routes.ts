import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

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
  {
    path: 'Home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [AuthGuard],
  },
];
