import {Component, OnInit} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MessageService} from 'primeng/api';
import {ILoginRequest} from '../../models/login.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _messageService: MessageService,
    private readonly _router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public async submit(): Promise<void> {
    if (!this.form.valid) {
      this._messageService.add({severity: 'error', summary: 'Error', detail: 'From invalid!'});
      return;
    }

    try {
      await this._authService.login(this.form.value);
      this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
      await this._router.navigate(['/']);
      location.reload();
    } catch {
      this.form.reset();
      this._messageService.add({severity: 'error', summary: 'Error', detail: 'Login error!'});
    }
  }
}
