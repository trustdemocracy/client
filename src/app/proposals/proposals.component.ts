import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent extends Translation {
  private proposals = new Array(50);

  constructor(public translation: TranslationService) {
    super(translation);
  }

}
