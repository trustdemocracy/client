import { Injectable } from '@angular/core';
import { User } from "app/_models/user";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
  private readonly STORAGE_TOKEN_KEY: string = 'userToken';
  private currentToken: string;

  constructor(private router: Router) {
    this.currentToken = this.getStoredToken();
  }

  login(user: User, remember: boolean = false) {
    console.log(user);
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
}
