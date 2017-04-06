import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'edit-proposal',
  templateUrl: './edit-proposal.component.html',
  styleUrls: ['./edit-proposal.component.scss']
})
export class EditProposalComponent extends Translation {

  constructor(public translation: TranslationService) {
    super(translation);
  }

}
