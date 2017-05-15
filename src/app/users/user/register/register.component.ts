import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { AuthenticationService } from "app/_services/authentication.service";
import { RegisterService } from "app/_services/register.service";
import { User } from "app/_models/user";

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
        if (success) {
          this.authenticationService.login(this.user, this.remember)
            .subscribe((loginSuccess: boolean) => {
              this.loading = false;
              if (loginSuccess) {
                this.router.navigate(['']);
              }
            });
        } else {
          this.loading = false;
          this.error = this.translation.translate('Failed to create account');
        }
      });
  }

  checkPasswordsMatch(): void {
    this.passwordsMatch = this.user.password === this.repeatedPassword;
  }

}
