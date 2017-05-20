import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { ActivatedRoute, Params } from "@angular/router";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";

@Component({
  selector: 'proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  providers: [
    ProposalsService
  ]
})
export class ProposalComponent extends Translation implements OnInit {
  proposal: Proposal = new Proposal();

  constructor(
    public translation: TranslationService,
    private route: ActivatedRoute,
    private proposalsService: ProposalsService
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
          // not found
        });
    });
  }

}
