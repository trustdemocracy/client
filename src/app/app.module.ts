import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SuiModule } from 'ng2-semantic-ui';
import { LocalizationModule } from 'angular-l10n';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UserComponent } from './users/user/user.component';
import { LoginComponent } from './users/user/login/login.component';
import { RegisterComponent } from './users/user/register/register.component';
import { EditProfileComponent } from './users/user/edit-profile/edit-profile.component';
import { TrustComponent } from './users/trust/trust.component';
import { FollowComponent } from './users/follow/follow.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalComponent } from './proposals/proposal/proposal.component';
import { EditProposalComponent } from './proposals/edit-proposal/edit-proposal.component';
import { AuthGuard } from "app/_guards/auth.guard";
import { AuthenticationService } from "app/_services/authentication.service";
import { LoggedGuard } from "app/_guards/logged.guard";
import { HttpService } from "app/_services/http.service";
import { NotFoundComponent } from "app/errors/not-found/not-found.component";
import { UsersComponent } from "app/users/users.component";





const routes: Routes = [
  { path: '', component: TimelineComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard] },
  { path: 'user/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/trust', component: TrustComponent, canActivate: [AuthGuard] },
  { path: 'users/follow', component: FollowComponent, canActivate: [AuthGuard] },
  { path: 'proposals', component: ProposalsComponent, canActivate: [AuthGuard] },
  { path: 'proposals/:id', component: ProposalComponent, canActivate: [AuthGuard] },
  { path: 'proposals/:id/edit', component: EditProposalComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
    EditProfileComponent,
    UserComponent,
    UsersComponent,
    TrustComponent,
    FollowComponent,
    ProposalsComponent,
    ProposalComponent,
    EditProposalComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SuiModule,
    LocalizationModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    LoggedGuard,
    AuthenticationService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
