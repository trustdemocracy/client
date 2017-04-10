import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends Translation {

  constructor(public translation: TranslationService) {
    super(translation);
  }

}
