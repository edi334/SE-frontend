import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Router} from '@angular/router';
import {ILoginRequest, ILoginResponse} from '../models/login.interface';
import {firstValueFrom, map, tap} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token?: string;
  private readonly _baseUrl= environment.apiUrl + '/account';
  private static readonly tokenStorageKey: string = 'token';
  private _authState: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly _http: HttpClient,
    private readonly _storage: StorageMap,
    private readonly _router: Router
  ) { }

  public async login(requestModel: ILoginRequest): Promise<any> {
    const url = `${this._baseUrl}/login/`;
    return firstValueFrom(this._http.post<ILoginResponse>(url, requestModel)
      .pipe(tap(async res => {
        const authToken = res.token;
        await this.saveSession(authToken);
      }))
      .pipe(map(() => {
        return true;
      })));
  }

  public async saveSession(token?: string): Promise<void> {
    if (token) {
      await firstValueFrom(this._storage.set(AuthService.tokenStorageKey, token));
    } else {
      await firstValueFrom(this._storage.delete(AuthService.tokenStorageKey));
    }
    await this._loadSession();
  }

  private async _loadSession(): Promise<void> {
    const initialStatus = !!this._token;
    const oldToken = this._token;
    this._token = <string>await firstValueFrom(this._storage.get(AuthService.tokenStorageKey));

    const differentStatus = initialStatus !== !!this._token || oldToken !== this._token;
    if (differentStatus) {
      this._authState.emit(!!this._token);
    }
  }

  public async getOptions(needsAuth?: boolean): Promise<{ headers?: HttpHeaders }> {
    return {headers: await this.getHeaders(needsAuth)};
  }

  public async getHeaders(needsAuth?: boolean): Promise<HttpHeaders> {
    if (!needsAuth) {
      return new HttpHeaders();
    }
    const token = await this.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().append('Authorization', `$Bearer ${token}`);
  }

  public async getToken(): Promise<string> {
    if (!this._token) {
      this._token = <string>await firstValueFrom(this._storage.get(AuthService.tokenStorageKey));
    }
    return this._token;
  }

  public get localAuthState(): boolean {
    return !!this._token;
  }

  public get authStateAsync(): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (this.localAuthState) {
        resolve(true);
      } else {
        await this._loadSession();
        resolve(this.localAuthState);
      }
    });
  }

  public get authStateChanged(): EventEmitter<boolean> {
    return this._authState;
  }

  public get authState(): boolean {
    return this.localAuthState;
  }

  public async logout(): Promise<void> {
    await this.saveSession();
    await this._router.navigate(['/']);
  }
}
