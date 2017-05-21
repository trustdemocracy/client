import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from 'app/../environments/environment';
import { Relationship } from "app/_models/relationship";

@Injectable()
export class TrustService {

  constructor(private http: HttpService) {
  }

  trust(id: string): Observable<Relationship> {
    const url = environment.socialApi.trustUser;
    const json = {'targetUserId': id};

    return this.http.post(url, JSON.stringify(json))
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Relationship.buildFromJson(response.json());
        }
        return null;
      });
  }

  untrust(id: string): Observable<Relationship> {
    const url = environment.socialApi.unTrust;
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
