import { Component, OnInit } from '@angular/core';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProposalsService } from "app/_services/proposals.service";
import { Proposal } from "app/_models/proposal";
import { Comment } from "app/_models/comment";
import { AuthenticationService } from "app/_services/authentication.service";
import { CommentsService } from "app/_services/comments.service";
import { VotesService } from "app/_services/votes.service";
import { Vote } from "app/_models/vote";

@Component({
  selector: 'proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  providers: [
    ProposalsService,
    CommentsService,
    VotesService
  ]
})
export class ProposalComponent extends Localization implements OnInit {
  proposal: Proposal;
  loadingComments: boolean;

  loadingCreateComment: boolean;
  comment: Comment = new Comment();

  optionVoted: string;

  constructor(
    public translation: TranslationService,
    public locale: LocaleService,
    private route: ActivatedRoute,
    private router: Router,
    private proposalsService: ProposalsService,
    private commentsService: CommentsService,
    private votesService: VotesService,
    private authService: AuthenticationService
  ) {
    super(locale, translation);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.proposalsService.find(id)
        .subscribe((proposal: Proposal) => {
          if (proposal !== null) {
            this.proposal = proposal;
            this.findComments();
            this.findVote();
          }
        }, (error: Error) => {
          this.router.navigateByUrl('/404', { skipLocationChange: true });
        });
    });
  }

  findComments(): void {
    this.loadingComments = true;
    this.commentsService.find(this.proposal.id)
      .subscribe((comments: Comment[]) => {
        this.loadingComments = false;
        this.proposal.comments = comments;
      });
  }

  findVote(): void {
    this.votesService.getVote(this.proposal.id)
      .subscribe((resultVote: Vote) => {
        if (resultVote !== null) {
          this.optionVoted = resultVote.option;
        }
      });
  }

  createComment(): void {
    this.loadingCreateComment = true;
    this.comment.proposalId = this.proposal.id;
    this.commentsService.create(this.comment)
      .subscribe((comment: Comment) => {
        this.loadingCreateComment = false;
        this.proposal.comments.push(comment);
        this.comment = new Comment();
      });
  }

  hasEditButton(): boolean {
    return this.proposal.isOwner(this.authService.getUser());
  }

  voteProposal(option: string): void {
    let vote = new Vote();
    vote.proposalId = this.proposal.id;
    vote.option = option;
    this.votesService.vote(vote)
      .subscribe((resultVote: Vote) => {
        this.optionVoted = resultVote.option;
      });
  }

}
