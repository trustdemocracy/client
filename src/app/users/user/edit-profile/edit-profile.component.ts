import { Component, OnInit, trigger, transition, state, style, animate } from '@angular/core';
import { Router } from "@angular/router";
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { AuthenticationService } from "app/_services/authentication.service";
import { User } from "app/_models/user";

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends Translation implements OnInit {
  user: User;
  tabs = [
    { 'id': 'profile', 'name': 'Profile' },
    { 'id': 'visibility', 'name': 'Visibility' },
    { 'id': 'password', 'name': 'Password' },
    { 'id': 'delete', 'name': 'Delete account' }
  ];
  currentTab: string = this.tabs[0].id;
  loading: boolean = false;

  repeatedPassword: string;
  passwordsMatch: boolean = true;

  submitSuccess: boolean;

  constructor(
    public translation: TranslationService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    super(translation);
  }

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  selectTab(tab: string) {
    this.currentTab = tab;
  }

  checkPasswordsMatch(): void {
    this.passwordsMatch = this.user.password === this.repeatedPassword;
  }

  updateProfile() {
    this.loading = true;
    const user = this.auth.getUser();
    user.name = this.user.name;
    user.surname = this.user.surname;
    this.auth.updateUser(user)
      .subscribe((success: boolean) => {
        this.loading = false;
        if (success) {
          this.showSuccess();
        }
      });
  }

  updateVisibility() {
    this.loading = true;
    const user = this.auth.getUser();
    user.visibility = this.user.visibility;
    this.auth.updateUser(user)
      .subscribe((success: boolean) => {
        this.loading = false;
        if (success) {
          this.showSuccess();
        }
      });
  }

  updatePassword() {
    this.loading = true;
    const user = this.auth.getUser();
    user.password = this.user.password;
    this.auth.updateUser(user)
      .subscribe((success: boolean) => {
        this.loading = false;
        if (success) {
          this.showSuccess();
        }
      });
  }

  deleteAccount() {
    this.loading = true;
    const user = this.auth.getUser();
    this.auth.deleteUser(user)
      .subscribe((success: boolean) => {
        this.loading = false;
        this.auth.logout();
        this.router.navigate(['/login']);
      });
  }


  private showSuccess() {
    this.submitSuccess = true;
    setTimeout(() => this.submitSuccess = false, 3000);
  }
}
