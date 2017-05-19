import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { AuthenticationService } from "app/_services/authentication.service";
import { User } from "app/_models/user";

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent extends Translation implements OnInit {
  user: User;

  constructor(public translation: TranslationService, private auth: AuthenticationService) {
    super(translation);
  }

  ngOnInit() {
    this.user = this.auth.getUser();
  }

}
