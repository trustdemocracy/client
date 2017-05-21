import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { RelationshipsService } from "app/_services/relationships.service";
import { Relationship } from "app/_models/relationship";
import { AuthenticationService } from "app/_services/authentication.service";
import { User } from "app/_models/user";

@Component({
  selector: 'relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.scss'],
  providers: [
    RelationshipsService
  ]
})
export class RelationshipsComponent extends Translation implements OnInit {
  user: User;
  followed: Relationship[] = [];
  following: Relationship[] = [];
  trusted: Relationship[] = [];
  trusting: Relationship[] = [];

  constructor(
    public translation: TranslationService,
    private authService: AuthenticationService,
    private relationshipsService: RelationshipsService
  ) {
    super(translation);
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.relationshipsService.findAll()
      .subscribe((relationships: Relationship[]) => {
        for (let relationship of relationships) {
          if (relationship.status === 'ACCEPTED') {
            if (relationship.type === 'FOLLOW') {
              if (relationship.originId === this.user.id) {
                this.followed.push(relationship);
              } else {
                this.following.push(relationship);
              }
            } else {
              if (relationship.originId === this.user.id) {
                this.trusted.push(relationship);
              } else {
                this.trusting.push(relationship);
              }
            }
          }
        }
      });
  }

}
