import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";
import { AuthenticationService } from "app/_services/authentication.service";

@Component({
  selector: 'proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  providers: [
    ProposalsService
  ]
})
export class ProposalComponent extends Translation implements OnInit {
  proposal: Proposal;

  constructor(
    public translation: TranslationService,
    private route: ActivatedRoute,
    private router: Router,
    private proposalsService: ProposalsService,
    private authService: AuthenticationService
  ) {
    super(translation);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.proposalsService.find(id)
        .subscribe((proposal: Proposal) => {
          if (proposal !== null) {
            this.proposal = proposal
          }
        }, (error: Error) => {
          this.router.navigateByUrl('/404', {skipLocationChange: true});
        });
    });
  }

  hasEditButton(): boolean {
    return this.proposal.isOwner(this.authService.getUser());
  }

}
