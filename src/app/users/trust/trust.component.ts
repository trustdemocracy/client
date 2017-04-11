import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.scss']
})
export class TrustComponent extends Translation {
  users = Array(50);

  constructor(public translation: TranslationService) {
    super(translation);
  }

}
