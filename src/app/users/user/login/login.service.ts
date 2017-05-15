import { Injectable } from '@angular/core';
import { User } from "app/models/user";

@Injectable()
export class LoginService {
  loginUser(user: User) {
    console.log(user);
  }
}
