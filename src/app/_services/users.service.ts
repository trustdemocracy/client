import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from 'app/../environments/environment';
import { User } from "app/_models/user";
import { AuthenticationService } from "app/_services/authentication.service";

@Injectable()
export class UsersService {

  constructor(private http: HttpService, private authService: AuthenticationService) {
  }

  find(id: string): Observable<User> {
    const url = environment.usersApi.findUser
      .replace(':userId', id);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return User.buildFromJson(response.json());
        }
        return null;
      });
  }

  findAll(): Observable<User[]> {
    const url = environment.usersApi.findAll;
    const currentUser = this.authService.getUser();

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const usersArray = response.json().users;
          const users: User[] = [];

          for (let i = 0; i < usersArray.length; i++) {
            let user = User.buildFromJson(usersArray[i]);
            if (user.id !== currentUser.id) {
              users.push(user);
            }
          }

          return users;
        }
        return null;
      });
  }
}
