import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { User } from "app/_models/user";
import { UsersService } from "app/_services/users.service";
import { FollowService } from "app/_services/follow.service";
import { TrustService } from "app/_services/trust.service";
import { Relationship } from "app/_models/relationship";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    UsersService,
    FollowService,
    TrustService
  ]
})
export class UsersComponent extends Translation implements OnInit {
  users: User[] = [];
  follows: Relationship[] = [];
  trusts: Relationship[] = [];

  constructor(
    public translation: TranslationService,
    private followService: FollowService,
    private trustService: TrustService,
    private usersService: UsersService
  ) {
    super(translation);
  }

  ngOnInit(): void {
    this.usersService.findAll()
      .subscribe((users: User[]) => {
        this.users = users;
      });
    this.followService.getRequests()
      .subscribe((relationships: Relationship[]) => {
        this.follows = relationships;
      });
    this.trustService.getRequests()
      .subscribe((relationships: Relationship[]) => {
        this.trusts = relationships;
      });
  }

  hasFollows(): boolean {
    return this.follows.length > 0;
  }

  hasTrusts(): boolean {
    return this.trusts.length > 0;
  }

  acceptFollow(id: string): void {
    this.followService.accept(id)
      .subscribe((rel: Relationship) => {

      });
  }

  acceptTrust(id: string): void {
    this.trustService.accept(id)
      .subscribe((rel: Relationship) => {

      });
  }

}
