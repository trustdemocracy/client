import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from 'app/../environments/environment';
import { SocialEvent } from "app/_models/socialevent";

@Injectable()
export class EventsService {

  constructor(private http: HttpService) {
  }

  findByAuthor(id: string): Observable<SocialEvent[]> {
    const url = environment.socialApi.getEventsByUser
      .replace(':userId', id);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const eventsArray = response.json().events;
          const events: SocialEvent[] = [];

          for (let i = 0; i < eventsArray.length; i++) {
            let event = SocialEvent.buildFromJson(eventsArray[i]);
            events.push(event);
          }

          return events.sort((a, b) => b.timestamp - a.timestamp);
        }
        return null;
      });
  }

  getTimeline(): Observable<SocialEvent[]> {
    const url = environment.socialApi.getEvents;

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const eventsArray = response.json().events;
          const events: SocialEvent[] = [];

          for (let i = 0; i < eventsArray.length; i++) {
            let event = SocialEvent.buildFromJson(eventsArray[i]);
            events.push(event);
          }

          return events.sort((a, b) => b.timestamp - a.timestamp);
        }
        return null;
      });
  }
}
