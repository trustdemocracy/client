import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends Translation {

  constructor(public translation: TranslationService) {
    super(translation);
  }

}
