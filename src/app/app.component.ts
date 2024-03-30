import { Component } from '@angular/core';
import {MegaMenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MegaMenuItem[];

  constructor() {
    this.items = [
      {label: 'Home', routerLink: ['/']},
      {label: 'Login', routerLink: ['/login']},
      {label: 'register', routerLink: ['/register']}
    ];
  }
}
