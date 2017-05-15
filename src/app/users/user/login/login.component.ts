import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { LoginService } from './login.service';
import { User } from "app/models/user";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent extends Translation {
  remember: boolean;
  user: User = new User();

  constructor(public translation: TranslationService, private loginService: LoginService) {
    super(translation);
  }

  onSubmit() {
    this.loginService.loginUser(this.user);
  }
}
