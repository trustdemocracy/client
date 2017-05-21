import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from 'app/_models/user';
import { environment } from 'app/../environments/environment';
import { APIMessages } from "app/_services/api-messages";

@Injectable()
export class RegisterService {
  private readonly USERNAME_ALREADY_EXISTS: string = 'Username already exists';

  constructor(private http: Http) {
  }

  register(user: User): Observable<boolean> {
    return this.http.post(environment.usersApi.createUser, JSON.stringify(user))
      .map((response: Response) => {
        return response.ok;
      })
      .catch((error: Response) => {
        if (error.status === 400 && error.json().message === this.USERNAME_ALREADY_EXISTS) {
          return Observable.throw(APIMessages.USERNAME_ALREADY_EXISTS);
        }
        return Observable.throw(APIMessages.SERVER_PROBLEM);
      });
  }

}
