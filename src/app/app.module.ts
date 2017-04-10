import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SuiModule } from 'ng2-semantic-ui';
import { TranslationModule } from 'angular-l10n';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LoginComponent } from './users/user/login/login.component';
import { RegisterComponent } from './users/user/register/register.component';
import { EditProfileComponent } from './users/user/edit-profile/edit-profile.component';
import { TrustComponent } from './users/trust/trust.component';
import { FollowComponent } from './users/follow/follow.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalComponent } from './proposals/proposal/proposal.component';
import { EditProposalComponent } from './proposals/edit-proposal/edit-proposal.component';





const routes: Routes = [
  { path: '', component: TimelineComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/edit', component: EditProfileComponent },
  { path: 'users/trust', component: TrustComponent },
  { path: 'users/follow', component: FollowComponent },
  { path: 'proposals', component: ProposalsComponent },
  { path: 'proposals/:id', component: ProposalComponent },
  { path: 'proposals/:id/edit', component: EditProposalComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
    EditProfileComponent,
    TrustComponent,
    FollowComponent,
    ProposalsComponent,
    ProposalComponent,
    EditProposalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SuiModule,
    TranslationModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
