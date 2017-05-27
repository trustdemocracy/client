import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from 'app/../environments/environment';
import { Vote } from "app/_models/vote";

@Injectable()
export class VotesService {

  constructor(private http: HttpService) {
  }

  vote(vote: Vote): Observable<Vote> {
    const url = environment.votesApi.voteProposal
      .replace(':proposalId', vote.proposalId);

    return this.http.post(url, JSON.stringify({"option": vote.option }))
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Vote.buildFromJson(response.json());
        }
        return null;
      });
  }

  getVote(proposalId: string): Observable<Vote> {
    const url = environment.votesApi.getVote
      .replace(':proposalId', proposalId);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Vote.buildFromJson(response.json());
        }
        return null;
      });
  }

}
