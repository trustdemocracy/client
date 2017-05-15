import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { AuthenticationService } from 'app/_services/authentication.service';
import { User } from "app/_models/user";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent extends Translation {
  remember: boolean;
  user: User = new User();

  constructor(public translation: TranslationService, private authenticationService: AuthenticationService) {
    super(translation);
  }

  onSubmit() {
    this.authenticationService.login(this.user);
  }
}
