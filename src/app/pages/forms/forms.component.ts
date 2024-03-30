import {Component, OnInit} from '@angular/core';
import {FormService} from '../../services/form.service';
import {IForm} from '../../models/form.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  forms: IForm[] = [];
  loading = true;

  constructor(
    private readonly _formService: FormService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.forms = await this._formService.getAvailableForms();
    this.loading = false;
  }
}
