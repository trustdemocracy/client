import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from 'app/../environments/environment';
import { Relationship } from "app/_models/relationship";

@Injectable()
export class FollowService {

  constructor(private http: HttpService) {
  }

  follow(id: string): Observable<Relationship> {
    const url = environment.socialApi.followUser;
    const json = {'targetUserId': id};

    return this.http.post(url, JSON.stringify(json))
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Relationship.buildFromJson(response.json());
        }
        return null;
      });
  }

  unfollow(id: string): Observable<Relationship> {
    const url = environment.socialApi.unFollow;
    const json = {'targetUserId': id};

    return this.http.post(url, JSON.stringify(json))
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Relationship.buildFromJson(response.json());
        }
        return null;
      });
  }
}
