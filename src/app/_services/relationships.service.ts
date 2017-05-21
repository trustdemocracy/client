import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from 'app/../environments/environment';
import { Relationship } from "app/_models/relationship";

@Injectable()
export class RelationshipsService {

  constructor(private http: HttpService) {
  }

  findWithUser(id: string): Observable<Relationship[]> {
    const url = environment.socialApi.getRelationshipsWithUser;
    const json = {'targetUserId': id};

    return this.http.post(url, JSON.stringify(json))
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const relationshipsArray = response.json().relationships;
          const relationships: Relationship[] = []

          for (let i = 0; i< relationshipsArray.length; i++) {
            let relationship = Relationship.buildFromJson(relationshipsArray[i]);
            relationships.push(relationship);
          }

          return relationships;
        }
        return null;
      });
  }
}
