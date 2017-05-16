import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from 'app/_models/user';
import { environment } from 'app/../environments/environment';

@Injectable()
export class RegisterService {

  constructor(private http: Http) {
  }

  register(user: User): Observable<boolean> {
    return this.http.post(environment.usersApi.createUser, JSON.stringify(user))
      .map((response: Response) => {
        return response.ok;
      });
  }

}
