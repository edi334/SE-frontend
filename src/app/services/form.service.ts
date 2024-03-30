import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IForm} from '../models/form.interface';
import {firstValueFrom} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly _baseUrl= environment.apiUrl + '/form';

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService
  ) { }

  public async getAvailableForms(): Promise<IForm[]> {
    const url = `${this._baseUrl}/get-available-forms/`;
    return firstValueFrom(this._http.get<IForm[]>(url));
  }

  public async startForm(title: string): Promise<IForm> {
    const token = await this._authService.getToken();
    const postData = {title: title, token: token};
    const url = `${this._baseUrl}/start-form/`;
    return firstValueFrom(this._http.post<IForm>(url, postData));
  }
}
