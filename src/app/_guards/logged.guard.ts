import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from "app/_services/authentication.service";

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
