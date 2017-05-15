import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from 'app/_models/user';
import { environment } from 'app/../environments/environment';

@Injectable()
export class AuthenticationService {
  private readonly STORAGE_TOKEN_KEY: string = 'userToken';
  private currentToken: string;

  constructor(private http: Http) {
    this.currentToken = this.getStoredToken();
  }

  login(user: User, remember: boolean = false): Observable<boolean> {
    return this.http.post(environment.usersApi.getToken,
      JSON.stringify({ username: user.username, password: user.password }))
      .map((response: Response) => {
        if (response.ok) {
          const token = response.json() && response.json().token;
          if (token) {
            this.storeToken(token, remember);
            return true;
          }
        }

        return false;
      });
  }

  isLogged(): boolean {
    return this.currentToken !== null;
  }

  logout(): void {
    this.currentToken = null;
    localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    sessionStorage.removeItem(this.STORAGE_TOKEN_KEY);
  }

  private getStoredToken(): string {
    let sessionToken = sessionStorage.getItem(this.STORAGE_TOKEN_KEY);
    if (sessionToken !== null) {
      return sessionToken;
    }
    return localStorage.getItem(this.STORAGE_TOKEN_KEY);
  }

  private storeToken(token: string, remember: boolean) {
    if (remember) {
      localStorage.setItem(this.STORAGE_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(this.STORAGE_TOKEN_KEY, token);
    }
  }
}
