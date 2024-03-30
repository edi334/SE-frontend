import {Component, Input} from '@angular/core';
import {IForm} from '../../../../models/form.interface';
import {FormService} from '../../../../services/form.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss'
})
export class FormCardComponent {
  @Input() form!: IForm;

  constructor(
    private readonly _formService: FormService,
    private readonly _router: Router,
  ) {
  }

  async startForm(): Promise<void> {
    const formResult = await this._formService.startForm(this.form.title);
    await this._router.navigate(['/question', formResult.title, formResult.first_question]);
  }
}
