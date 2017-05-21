import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { Proposal } from "app/_models/proposal";
import { ProposalsService } from "app/_services/proposals.service";

@Component({
  selector: 'proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss'],
  providers: [
    ProposalsService
  ]
})
export class ProposalsComponent extends Translation implements OnInit {
  public proposals: Proposal[];
  public ownProposals: Proposal[];
  public draftProposals: Proposal[];

  constructor(
    public translation: TranslationService,
    private proposalsService: ProposalsService
  ) {
    super(translation);
  }

  ngOnInit(): void {
    this.proposalsService.findOwnProposals()
      .subscribe((proposals: Proposal[]) => {
        this.ownProposals = proposals.filter((proposal: Proposal) => proposal.isPublished());
        this.draftProposals = proposals.filter((proposal: Proposal) => !proposal.isPublished());
      });
    this.proposalsService.findAll()
      .subscribe((proposals: Proposal[]) => {
        this.proposals = proposals;
      });
  }

}
