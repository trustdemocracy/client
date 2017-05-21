import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { AuthenticationService } from "app/_services/authentication.service";
import { RegisterService } from "app/_services/register.service";
import { User } from "app/_models/user";
import { APIMessages } from "app/_services/api-messages";

@Component({
  selector: 'login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent extends Translation {
  remember: boolean;
  user: User = new User();
  repeatedPassword: string = '';
  error: string = '';
  loading: boolean = false;
  passwordsMatch: boolean = true;

  constructor(
    public translation: TranslationService,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    private router: Router
  ) {
    super(translation);
  }

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.registerService.register(this.user)
      .subscribe((success: boolean) => {
        this.loading = false;
        if (success) {
          this.login();
        } else {
          this.error = this.translation.translate('Failed to create account');
        }
      }, (error: APIMessages) => {
        this.loading = false;

        if (error === APIMessages.USERNAME_ALREADY_EXISTS) {
          this.error = this.translation.translate('Username already exists');
        }
      });
  }

  checkPasswordsMatch(): void {
    this.passwordsMatch = this.user.password === this.repeatedPassword;
  }

  private login(): void {
    this.authenticationService.login(this.user, this.remember)
      .subscribe((loginSuccess: boolean) => {
        if (loginSuccess) {
          this.router.navigate(['']);
        }
      });
  }

}
