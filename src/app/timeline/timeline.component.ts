import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { AuthenticationService } from "app/_services/authentication.service";
import { User } from "app/_models/user";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";
import { EventsService } from "app/_services/events.service";
import { SocialEvent } from "app/_models/socialevent";

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [
    ProposalsService,
    EventsService
  ]
})
export class TimelineComponent extends Translation implements OnInit {
  user: User;
  featuredProposals: Proposal[];
  events: SocialEvent[];

  constructor(
    public translation: TranslationService,
    private auth: AuthenticationService,
    private eventsService: EventsService,
    private proposalsService: ProposalsService
  ) {
    super(translation);
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.proposalsService.findAll()
      .subscribe((proposals: Proposal[]) => {
        this.featuredProposals = proposals;
      });
    this.eventsService.getTimeline()
      .subscribe((events: SocialEvent[]) => {
        this.events = events;
      });
  }

}
