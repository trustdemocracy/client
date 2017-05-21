import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
import { User } from "app/_models/user";
import { UsersService } from "app/_services/users.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    UsersService
  ]
})
export class UsersComponent extends Translation implements OnInit {
  users: User[];

  constructor(
    public translation: TranslationService,
    private usersService: UsersService
  ) {
    super(translation);
  }

  ngOnInit(): void {
    this.usersService.findAll()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

}
