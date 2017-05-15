import { Injectable } from '@angular/core';
import { User } from "app/_models/user";

@Injectable()
export class AuthenticationService {
  login(user: User) {
    console.log(user);
  }
}
