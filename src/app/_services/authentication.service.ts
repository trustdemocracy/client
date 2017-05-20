import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from 'app/_models/user';
import { environment } from 'app/../environments/environment';
import { APIMessages } from "app/_services/api-messages";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
  private readonly BAD_CREDENTIALS = 'Bad credentials';

  private readonly ACCESS_TOKEN_KEY: string = 'userToken';
  private readonly REFRESH_TOKEN_KEY: string = 'refreshToken';
  private accessToken: string;
  private refreshToken: string;
  private remember: boolean;

  constructor(private http: Http, private router: Router) {
    this.accessToken = this.getAccessToken();
    this.refreshToken = this.getRefreshToken();
  }

  login(user: User, remember: boolean = false): Observable<boolean> {
    const content: string = JSON.stringify({ username: user.username, password: user.password });

    return this.http.post(environment.usersApi.getToken, content)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const accessToken = response.json().accessToken;
          const refreshToken = response.json().refreshToken;
          if (accessToken && refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.remember = remember;
            this.storeToken(accessToken, refreshToken, remember);
            return true;
          }
        }

        return false;
      })
      .catch((error: Response) => {
        if (error.status === 401 && error.json().message === this.BAD_CREDENTIALS) {
          return Observable.throw(APIMessages.BAD_CREDENTIALS);
        }
        return Observable.throw(APIMessages.SERVER_PROBLEM);
      });
  }

  refreshAccessToken(): Observable<boolean> {
    const content: string = JSON.stringify({ refreshToken: this.refreshToken });
    const headers: Headers = new Headers();
    headers.append('Authorization', this.getAuthorizationHeader());

    return this.http.post(environment.usersApi.refreshToken, content, { 'headers': headers })
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const accessToken = response.json().accessToken;
          const refreshToken = response.json().refreshToken;
          if (accessToken && refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.storeToken(accessToken, refreshToken, this.remember);
            return true;
          }
        }

        return false;
      });
  }

  isLogged(): boolean {
    return this.accessToken !== null;
  }

  logout(): void {
    this.accessToken = null;
    this.removeTokens();
  }

  getAuthorizationHeader(): string {
    return 'Bearer: ' + this.accessToken;
  }

  getUser(): User {
    if (this.accessToken === '') {
      return null;
    }

    const jwt = this.decodeJwt(this.accessToken);
    const user = new User();
    user.id = jwt['sub'];
    user.username = jwt['username'];
    user.email = jwt['email'];
    user.name = jwt['name'];
    user.surname = jwt['surname'];
    user.visibility = jwt['visibility'];

    return user;
  }

  updateUser(user: User): Observable<boolean> {
    const url = environment.usersApi.updateUser.replace(':userId', user.id);
    const content: string = JSON.stringify(user);
    const headers: Headers = new Headers();
    headers.append('Authorization', this.getAuthorizationHeader());

    return this.encapsulateWithRefresh(
      () => this.http.put(url, content, { 'headers': headers })
    )
      .map((response: Response) => {
        this.refreshAccessToken()
          .subscribe();

        return response.ok && response.json();
      });
  }

  deleteUser(user: User): Observable<boolean> {
    const url = environment.usersApi.deleteUser.replace(':userId', user.id);
    const headers: Headers = new Headers();
    headers.append('Authorization', this.getAuthorizationHeader());

    return this.encapsulateWithRefresh(
      () => this.http.delete(url, { 'headers': headers })
    )
      .map((response: Response) => {
        return response.ok && response.json();
      });
  }

  encapsulateWithRefresh(generator: (() => Observable<Response>)): Observable<Response> {
    if (this.isAboutToExpire()) {
      return this.refreshAccessToken()
        .flatMap((success: boolean) => {
          return generator();
        })
        .catch((error: Error) => {
          this.logout();
          this.router.navigate(['/login']);
          return Observable.throw(error);
        });
    }

    return generator()
      .catch((error: Response) => {
        if (error.status === 401) {
          return this.refreshAccessToken()
            .flatMap((success: boolean) => {
              if (success) {
                return generator();
              }
              return Observable.throw(error);
            })
            .catch(() => {
              this.logout();
              this.router.navigate(['/login']);
              return Observable.throw(error);
            });
        }
        return Observable.throw(error);
      });
  }

  private isAboutToExpire(): boolean {
    const token = this.decodeJwt(this.accessToken);
    const expirationInMilis = token['exp'] * 1000;
    return expirationInMilis <= Date.now();
  }

  private getAccessToken(): string {
    let cookieToken = this.getCookie(this.ACCESS_TOKEN_KEY);
    if (cookieToken !== null) {
      return cookieToken;
    }
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  private getRefreshToken(): string {
    let cookieToken = this.getCookie(this.REFRESH_TOKEN_KEY);
    if (cookieToken !== null) {
      return cookieToken;
    }

    this.remember = true;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private storeToken(accessToken: string, refreshToken: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    } else {
      this.setCookie(this.ACCESS_TOKEN_KEY, accessToken);
      this.setCookie(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.deleteCookie(this.ACCESS_TOKEN_KEY);
    this.deleteCookie(this.REFRESH_TOKEN_KEY);
  }

  private setCookie(name: string, value: string): void {
    document.cookie = name + '=' + value;
  }

  private deleteCookie(name: string): void {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  private getCookie(name: string): string {
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, name.length + 1) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(name.length + 1));
      })[0] || null;
  }

  private decodeJwt(token: string): object {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
