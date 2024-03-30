import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {reverseAuthGuard} from './guards/reverse-auth.guard';
import {FormsComponent} from './pages/forms/forms.component';
import {authGuard} from './guards/auth.guard';
import {QuestionComponent} from './pages/question/question.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [reverseAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [reverseAuthGuard]
  },
  {
    path: 'forms',
    component: FormsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'question/:formTitle/:id',
    component: QuestionComponent,
    canActivate: [authGuard]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
