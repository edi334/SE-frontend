import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MegaMenuModule} from 'primeng/megamenu';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MegaMenuModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
