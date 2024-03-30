import {Component, OnInit, ViewChild} from '@angular/core';
import {MegaMenuItem} from 'primeng/api';
import {AuthService} from './services/auth.service';
import {MegaMenu, MegaMenuSub} from 'primeng/megamenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  items!: MegaMenuItem[];

  constructor(
    private readonly _authService: AuthService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this._updateMenuItems();
  }

  private async _updateMenuItems(): Promise<void> {
    const isLoggedIn = await this._authService.authStateAsync;

    this.items = [
      {label: 'Home', routerLink: ['/']},
      {label: 'Logout', command: () => this.logout(), visible: isLoggedIn},
      {label: 'Login', routerLink: ['/login'], visible: !isLoggedIn},
      {label: 'Register', routerLink: ['/register'], visible: !isLoggedIn}
    ];
  }

  public async logout(): Promise<void> {
    await this._authService.logout();
    await this._updateMenuItems();
  }
}
