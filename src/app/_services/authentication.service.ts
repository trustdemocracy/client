import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from 'app/_models/user';
import { environment } from 'app/../environments/environment';

@Injectable()
export class AuthenticationService {
  private readonly ACCESS_TOKEN_KEY: string = 'userToken';
  private readonly REFRESH_TOKEN_KEY: string = 'refreshToken';
  private accessToken: string;
  private refreshToken: string;
  private remember: boolean;

  constructor(private http: Http) {
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
      });
  }

  refreshAccessToken(): Observable<boolean> {
    const content: string = JSON.stringify({ refreshToken: this.refreshToken });
    const headers: Headers = new Headers();
    headers.append('Authorization', this.getAuthorizationHeader());

    return this.http.post(environment.usersApi.refreshToken, content, headers)
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
}
