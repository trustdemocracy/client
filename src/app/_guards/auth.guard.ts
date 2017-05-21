import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from "app/_services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.isLogged()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
