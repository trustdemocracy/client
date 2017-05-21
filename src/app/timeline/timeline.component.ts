import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { AuthenticationService } from "app/_services/authentication.service";
import { User } from "app/_models/user";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";
import { EventsService } from "app/_services/events.service";
import { SocialEvent } from "app/_models/socialevent";
import { RelationshipsService } from "app/_services/relationships.service";
import { Relationship } from "app/_models/relationship";

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [
    ProposalsService,
    EventsService,
    RelationshipsService
  ]
})
export class TimelineComponent extends Translation implements OnInit {
  user: User;
  featuredProposals: Proposal[];
  events: SocialEvent[];
  relationships: Relationship[];

  followingCount: number = 0;
  followedCount: number = 0;
  trustingCount: number = 0;
  trustedCount: number = 0;

  hasPending: boolean;

  constructor(
    public translation: TranslationService,
    private auth: AuthenticationService,
    private eventsService: EventsService,
    private proposalsService: ProposalsService,
    private relationshipsService: RelationshipsService
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

    this.relationshipsService.findAll()
      .subscribe((relationships: Relationship[]) => {
        this.relationships = relationships;
        this.updateNumbers();
      });
  }

  private updateNumbers(): void {
    this.followingCount = 0;
    this.followedCount = 0;
    this.trustingCount = 0;
    this.trustedCount = 0;

    this.hasPending = false;

    this.relationships
      .forEach((relationship: Relationship) => {
        if (relationship.status === 'PENDING') {
          if (relationship.targetId === this.user.id) {
            this.hasPending = true;
          }
        } else {
          if (relationship.type === 'FOLLOW') {
            if (relationship.originId === this.user.id) {
              this.followingCount++;
            } else if (relationship.targetId === this.user.id) {
              this.followedCount++;
            }
          } else {
            if (relationship.originId === this.user.id) {
              this.trustingCount++;
            } else if (relationship.targetId === this.user.id) {
              this.trustedCount++;
            }
          }
        }
      });
  }

}
