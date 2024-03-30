import {Component, OnInit} from '@angular/core';
import {CriteriaService} from '../../services/criteria.service';
import {IUserCriteria} from '../../models/criteria.interface';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userCriteria: IUserCriteria[] = [];
  loading = true;
  isLoggedIn = false;

  constructor(
    private readonly _authService: AuthService,
    private readonly _criteriaService: CriteriaService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.isLoggedIn = await this._authService.authStateAsync;
    if (this.isLoggedIn) {
      this.userCriteria = await this._criteriaService.getCriteria();
    }
    this.loading = false;
  }
}
