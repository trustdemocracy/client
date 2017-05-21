import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { User } from "app/_models/user";
import { UsersService } from "app/_services/users.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    UsersService,
    ProposalsService
  ]
})
export class UserComponent extends Translation implements OnInit {
  user: User;
  proposals: Proposal[];

  constructor(
    public translation: TranslationService,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private proposalsService: ProposalsService
  ) {
    super(translation);
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

}
