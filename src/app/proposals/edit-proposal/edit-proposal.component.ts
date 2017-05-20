import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { Proposal } from "app/_models/proposal";
import { ActivatedRoute, Params } from "@angular/router";
import { ProposalsService } from "app/_services/proposals.service";

@Component({
  selector: 'edit-proposal',
  templateUrl: './edit-proposal.component.html',
  styleUrls: ['./edit-proposal.component.scss'],
  providers: [ProposalsService]
})
export class EditProposalComponent extends Translation implements OnInit {
  proposal: Proposal = new Proposal();
  isNew: boolean;

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
      if (id === 'new') {
        this.isNew = true;
        this.proposal = new Proposal();
      } else {
        this.proposalsService.find(id)
          .subscribe((proposal: Proposal) => {
            this.proposal = proposal;
          });
      }
    });
  }

  saveProposal(): void {
    if (this.isNew) {
      this.proposalsService.create(this.proposal)
        .subscribe((proposal: Proposal) => {
          if (proposal !== null) {
            this.isNew = false;
            this.proposal = proposal;
          }
        });
    } else {

    }
  }

  publishProposal(): void {
    this.proposalsService.publish(this.proposal.id)
      .subscribe((proposal: Proposal) => {
        if (proposal !== null) {
          this.proposal = proposal;
        }
      });
  }

  unpublishProposal(): void {
    this.proposalsService.unpublish(this.proposal.id)
      .subscribe((proposal: Proposal) => {
        if (proposal !== null) {
          this.proposal = proposal;
        }
      });
  }
}
