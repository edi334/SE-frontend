import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Router} from '@angular/router';
import {ISession} from '../models/session.interface';
import {firstValueFrom, map, tap} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token?: string;
  private readonly _baseUrl= environment.apiUrl + '/api/auth';
  private _session?: ISession;
  private static readonly tokenStorageKey: string = 'token';
  private static readonly sessionStorageKey: string = 'session';
  private _authState: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly _http: HttpClient,
    private readonly _storage: StorageMap,
    private readonly _router: Router
  ) { }

  public async loginWithGoogle(googleIdToken: string): Promise<boolean> {
    const url = `${this._baseUrl}/google-login`;
    const headers = new HttpHeaders().append('Authorization', `Bearer ${googleIdToken}`);
    return firstValueFrom(this._http.post<ISession>(url, {}, {headers})
      .pipe(tap(async authSession => {
        await this.saveSession(authSession);
      }))
      .pipe(map(() => {
        return true;
      })));
  }

  public async saveSession(authSession?: ISession): Promise<void> {
    if (authSession) {
      await firstValueFrom(this._storage.set(AuthService.tokenStorageKey, authSession.token));
      await firstValueFrom(this._storage.set(AuthService.sessionStorageKey, authSession));
    } else {
      await firstValueFrom(this._storage.delete(AuthService.tokenStorageKey));
      await firstValueFrom(this._storage.delete(AuthService.sessionStorageKey));
    }
    await this._loadSession();
  }

  private async _loadSession(): Promise<void> {
    const initialStatus = !!this._token;
    const oldToken = this._token;
    this._token = <string>await firstValueFrom(this._storage.get(AuthService.tokenStorageKey));
    if (this._token) {
      this._session = <ISession>await firstValueFrom(this._storage.get(AuthService.sessionStorageKey));
    } else {
      this._session = undefined;
    }
    const differentStatus = initialStatus !== !!this._token || oldToken !== this._token;
    if (differentStatus) {
      this._authState.emit(!!this._token);
    }
  }

  public async getOptions(needsAuth?: boolean): Promise<{ headers?: HttpHeaders }> {
    return {headers: await this.getHeaders(needsAuth)};
  }

  public async hasRole(role: string): Promise<boolean> {
    const session = await this.getSession();
    if (!session || !session.role) {
      return false;
    }

    return session.role.indexOf(role) !== -1;
  }

  public async getHeaders(needsAuth?: boolean): Promise<HttpHeaders> {
    if (!needsAuth) {
      return new HttpHeaders();
    }
    const session = await this.getSession();

    if (!session) {
      return new HttpHeaders();
    }

    return new HttpHeaders().append('Authorization', `${session.tokenType} ${session.token}`);
  }

  public async getSession(): Promise<ISession> {
    if (!this._session) {
      this._session = <ISession>await firstValueFrom(this._storage.get(AuthService.sessionStorageKey));
    }
    return this._session;
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
