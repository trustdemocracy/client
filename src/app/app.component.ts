import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from "app/_services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Translation implements OnInit {
  selectedLanguage: string;
  availableLanguages: string[] = ['English', 'Español'];
  availableLocales = {
    'English': 'en',
    'Español': 'es'
  };
  isUserLogged: boolean = this.authenticationService.isLogged();

  constructor(
    public locale: LocaleService,
    public translation: TranslationService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
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

  ngOnInit(): void {
    this.resetScroll();
  }

  selectLanguage(): void {
    this.locale.setCurrentLanguage(this.availableLocales[this.selectedLanguage]);
  }

  logout(): void {
    this.authenticationService.logout();
  }

  resetScroll(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

}
