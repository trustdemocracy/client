import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Proposal } from "app/_models/proposal";
import { environment } from 'app/../environments/environment';
import { AuthenticationService } from "app/_services/authentication.service";

@Injectable()
export class ProposalsService {

  constructor(private http: HttpService, private authService: AuthenticationService) {
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

  find(id: string): Observable<Proposal> {
    const url = environment.proposalsApi.getProposal
      .replace(':proposalId', id);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Proposal.buildFromJson(response.json());
        }
        return null;
      });
  }

  findAll(): Observable<Proposal[]> {
    const url = environment.proposalsApi.getProposals;

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const proposalsArray = response.json().proposals;
          const proposals: Proposal[] = [];

          for (let i = 0; i < proposalsArray.length; i++) {
            proposals.push(Proposal.buildFromJson(proposalsArray[i]));
          }

          return proposals;
        }
        return null;
      });
  }

  findOwnProposals(): Observable<Proposal[]> {
    const user = this.authService.getUser();
    return this.findByAuthor(user.id);
  }

  findByAuthor(id: string): Observable<Proposal[]> {
    const url = environment.proposalsApi.getProposalsByAuthor
      .replace(':authorId', id);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          const proposalsArray = response.json().proposals;
          const proposals: Proposal[] = [];

          for (let i = 0; i < proposalsArray.length; i++) {
            proposals.push(Proposal.buildFromJson(proposalsArray[i]));
          }

          return proposals;
        }
        return null;
      });
  }

  publish(id: string): Observable<Proposal> {
    const url = environment.proposalsApi.publishProposal
      .replace(':proposalId', id);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Proposal.buildFromJson(response.json());
        }
        return null;
      });
  }

  unpublish(id: string): Observable<Proposal> {
    const url = environment.proposalsApi.unpublishProposal
      .replace(':proposalId', id);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Proposal.buildFromJson(response.json());
        }
        return null;
      });
  }

  delete(id: string): Observable<Proposal> {
    const url = environment.proposalsApi.deleteProposal
      .replace(':proposalId', id);

    return this.http.delete(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Proposal.buildFromJson(response.json());
        }
        return null;
      });
  }
}
