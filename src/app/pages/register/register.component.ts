import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _messageService: MessageService,
    private readonly _router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public async submit(): Promise<void> {
    if (!this.form.valid) {
      this._messageService.add({severity: 'error', summary: 'Error', detail: 'From invalid!'});
      return;
    }

    try {
      await this._authService.register(this.form.value);
      this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
      await this._router.navigate(['/login']);
    } catch {
      this.form.reset();
      this._messageService.add({severity: 'error', summary: 'Error', detail: 'Login error!'});
    }
  }
}
