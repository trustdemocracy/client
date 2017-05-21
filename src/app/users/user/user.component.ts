import { Component, OnInit } from '@angular/core';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { User } from "app/_models/user";
import { UsersService } from "app/_services/users.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";
import { EventsService } from "app/_services/events.service";
import { SocialEvent } from "app/_models/socialevent";
import { AuthenticationService } from "app/_services/authentication.service";
import { FollowService } from "app/_services/follow.service";
import { Relationship } from "app/_models/relationship";
import { RelationshipsService } from "app/_services/relationships.service";
import { TrustService } from "app/_services/trust.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    UsersService,
    ProposalsService,
    EventsService,
    FollowService,
    TrustService,
    RelationshipsService
  ]
})
export class UserComponent extends Localization implements OnInit {
  user: User;
  proposals: Proposal[];
  events: SocialEvent[];
  isCurrentUser: boolean;

  relationshipsWithUser: Relationship[] = [];

  isFollowed: boolean;
  isFollowing: boolean;
  isTrusted: boolean;
  isTrusting: boolean;

  constructor(
    public locale: LocaleService,
    public translation: TranslationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private usersService: UsersService,
    private proposalsService: ProposalsService,
    private followService: FollowService,
    private trustService: TrustService,
    private relationshipsService: RelationshipsService,
    private eventsService: EventsService
  ) {
    super(locale, translation);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.loadUser(id);
    });
  }

  loadUser(id: string): void {
    this.usersService.find(id)
      .subscribe((user: User) => {
        this.user = user;
        this.isCurrentUser = user.id === this.authService.getUser().id;
        this.loadRelationships(user.id);
        this.loadProposals(user.id);
        this.loadEvents(user.id);
      }, (error: Error) => {
        this.router.navigateByUrl('/404', { skipLocationChange: true });
      });
  }

  loadRelationships(userId: string): void {
    this.relationshipsService.findWithUser(userId)
      .subscribe((relationships: Relationship[]) => {
        this.relationshipsWithUser = relationships;
        this.notifyState();
      });
  }

  loadProposals(userId: string): void {
    this.proposalsService.findByAuthor(userId)
      .subscribe((proposals: Proposal[]) => {
        this.proposals = proposals;
      }, (error: Error) => {
      });
  }

  loadEvents(userId: string): void {
    this.eventsService.findByAuthor(userId)
      .subscribe((events: SocialEvent[]) => {
        this.events = events;
      }, (error: Error) => {
      });
  }

  followUser(): void {
    this.followService.follow(this.user.id)
      .subscribe((relationship: Relationship) => {
        if (relationship !== null) {
          this.addRelationship(relationship);
        }
      });
  }

  unfollowUser(): void {
    this.followService.unfollow(this.user.id)
      .subscribe((relationship: Relationship) => {
        if (relationship !== null) {
          this.removeRelationship(relationship);
        }
      });
  }

  cancelFollow(): void {
    this.followService.cancel(this.user.id)
      .subscribe((rel: Relationship) => {
        this.removeRelationship(rel);
      });
  }

  trustUser(): void {
    this.trustService.trust(this.user.id)
      .subscribe((relationship: Relationship) => {
        if (relationship !== null) {
          this.addRelationship(relationship);
        }
      });
  }

  untrustUser(): void {
    this.trustService.untrust(this.user.id)
      .subscribe((relationship: Relationship) => {
        if (relationship !== null) {
          this.removeRelationship(relationship);
        }
      });
  }

  cancelTrust(): void {
    this.trustService.cancel(this.user.id)
      .subscribe((rel: Relationship) => {
        this.removeRelationship(rel);
      });
  }

  private addRelationship(rel: Relationship): void {
    this.relationshipsWithUser.push(rel);
    this.notifyState();
  }

  private removeRelationship(rel: Relationship): void {
    this.relationshipsWithUser.forEach((item, index, array) => {
      if (item.originId === rel.originId && item.type === rel.type) {
        array.splice(index, 1);
      }
    });
    this.notifyState();
  }

  private notifyState(): void {
    this.resetFollowed();
    this.resetFollowing();
    this.resetTrusting();
    this.resetTrusted();
  }

  private resetFollowing(): void {
    this.isFollowing = this.hasRelationship((rel: Relationship) =>
      this.user.id === rel.originId && rel.type === 'FOLLOW'
    );
  }

  private resetFollowed(): void {
    this.isFollowed = this.hasRelationship((rel: Relationship) =>
      this.user.id === rel.targetId && rel.type === 'FOLLOW'
    );
  }

  private resetTrusting(): void {
    this.isTrusting = this.hasRelationship((rel: Relationship) =>
      this.user.id === rel.originId && rel.type === 'TRUST'
    );
  }

  private resetTrusted(): void {
    this.isTrusted = this.hasRelationship((rel: Relationship) =>
      this.user.id === rel.targetId && rel.type === 'TRUST'
    );
  }

  private hasRelationship(strategy: ((rel: Relationship) => boolean)): boolean {
    for (let relationship of this.relationshipsWithUser) {
      if (strategy(relationship)) {
        return true;
      }
    }
    return false;
  }
}
