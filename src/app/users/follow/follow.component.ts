import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent extends Translation {
  users = Array(50);

  constructor(public translation: TranslationService) {
    super(translation);
  }

}
