import { Component, OnInit } from '@angular/core';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { User } from "app/_models/user";
import { UsersService } from "app/_services/users.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";
import { EventsService } from "app/_services/events.service";
import { SocialEvent } from "app/_models/socialevent";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    UsersService,
    ProposalsService,
    EventsService
  ]
})
export class UserComponent extends Localization implements OnInit {
  user: User;
  proposals: Proposal[];
  events: SocialEvent[];

  constructor(
    public locale: LocaleService,
    public translation: TranslationService,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private proposalsService: ProposalsService,
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
        this.loadProposals(user.id);
        this.loadEvents(user.id);
      }, (error: Error) => {
        this.router.navigateByUrl('/404', { skipLocationChange: true });
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
        console.log(events);
      }, (error: Error) => {
      });
  }

}
