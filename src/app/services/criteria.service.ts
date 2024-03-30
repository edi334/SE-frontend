import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {ICriteriaUpdate, ICriteriaResponse, ICriteriaCheck, IUserCriteria} from '../models/criteria.interface';
import {firstValueFrom} from 'rxjs';
import {IRecommendation} from '../models/form.interface';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {
  private readonly _formBaseUrl= environment.apiUrl + '/user-form-criteria';
  private readonly _userBaseUrl= environment.apiUrl + '/user-criteria';

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService
  ) { }

  public async updateCriteria(form_title: string, criteria_id: number): Promise<ICriteriaResponse> {
    const url = `${this._formBaseUrl}/update-user-form-criteria/`;
    const token = await this._authService.getToken();
    const body: ICriteriaUpdate = {token: token, form_title: form_title, criteria_id: criteria_id};
    return firstValueFrom(this._http.post<ICriteriaResponse>(url, body));
  }

  public async checkCriteria(form_title: string, check_required: number): Promise<IRecommendation | string[]> {
    const url = `${this._formBaseUrl}/check-user-form-criteria/`;
    const token = await this._authService.getToken();
    const body: ICriteriaCheck = {token: token, form_title: form_title, value_to_check: check_required};
    return firstValueFrom(this._http.post<IRecommendation | string[]>(url, body));
  }

  public async getCriteria(): Promise<IUserCriteria[]> {
    const url = `${this._userBaseUrl}/get-user-criterias/`;
    const token = await this._authService.getToken();
    return firstValueFrom(this._http.post<IUserCriteria[]>(url, {token: token}));
  }

  public async resetCriteria(): Promise<any> {
    const url = `${this._userBaseUrl}/reset-user-criterias/`;
    const token = await this._authService.getToken();
    return firstValueFrom(this._http.post(url, {token: token}));
  }
}
