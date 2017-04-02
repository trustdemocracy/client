import { Component } from '@angular/core';

import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Translation {

    constructor(public locale: LocaleService, public translation: TranslationService) {
        super(translation);

        this.locale.addConfiguration()
            .addLanguages(['es', 'en'])
            .setCookieExpiration(30)
            .defineDefaultLocale('es', 'ES')
            .useLocalStorage();
        this.locale.init();

        this.translation.addConfiguration()
            .addProvider('./assets/locales/');
        this.translation.init();
    }

}