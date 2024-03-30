import {Component, OnInit} from '@angular/core';
import {CriteriaService} from '../../services/criteria.service';
import {IUserCriteria} from '../../models/criteria.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userCriteria: IUserCriteria[] = [];
  loading = true;

  constructor(
    private readonly _criteriaService: CriteriaService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.userCriteria = await this._criteriaService.getCriteria();
    this.loading = false;
  }
}
