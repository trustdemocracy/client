import { Component } from '@angular/core';
import { Router } from "@angular/router";
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
  error: string = '';
  loading: boolean = false;

  constructor(
    public translation: TranslationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    super(translation);
  }

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.authenticationService.login(this.user, this.remember)
      .subscribe((success: boolean) => {
        this.loading = false;
        if (success) {
          this.router.navigate(['']);
        } else {
          this.error = this.translation.translate('Invalid credentials');
        }
      });
  }
}
