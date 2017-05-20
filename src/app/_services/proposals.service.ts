import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Proposal } from "app/_models/proposal";
import { environment } from 'app/../environments/environment';

@Injectable()
export class ProposalsService {

  constructor(private http: HttpService) {
  }

  create(proposal: Proposal): Observable<Proposal> {
    return this.http.post(environment.proposalsApi.createProposal, JSON.stringify(proposal))
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Proposal.buildFromJson(response.json());
        }
        return null;
      });
  }

  getProposal(id: string): Observable<Proposal> {
    const url = environment.proposalsApi.getProposal
      .replace(':id', id);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Proposal.buildFromJson(response.json());
        }
        return null;
      });
  }
}
