import { User } from "app/_models/user";
import { Comment } from "app/_models/comment";
import { Vote } from "app/_models/vote";

export class Proposal {
  id: string;
  title: string;
  dueDate: number;
  brief: string;
  source: string;
  motivation: string;
  measures: string;
  status: string;

  authorUsername: string;

  comments: Comment[];

  votes: { [key: string]: number };

  constructor() {
  }

  isPublished(): boolean {
    return this.status === 'PUBLISHED';
  }

  isOwner(user: User): boolean {
    return this.authorUsername === user.username;
  }

  hasComments(): boolean {
    return this.comments && this.comments.length > 0;
  }

  addVote(vote: Vote, previouslyVoted: string) {
    switch(vote.option) {
      case 'FAVOUR':
        this.votes.FAVOUR += vote.rank;
        break;
      case 'AGAINST':
        this.votes.AGAINST += vote.rank;
        break;
      case 'WITHDRAW':
        if (previouslyVoted != null) {
          let withdrawVote = new Vote();
          withdrawVote.option = previouslyVoted;
          withdrawVote.rank = -vote.rank;
          this.addVote(withdrawVote, null);
        }
        break;
    }
  }

  static buildFromJson(json: any): Proposal {
    const instance = new Proposal();

    instance.id = json.id;
    instance.title = json.title;
    instance.brief = json.brief;
    instance.source = json.source;
    instance.motivation = json.motivation;
    instance.measures = json.measures;
    instance.status = json.status;
    instance.authorUsername = json.authorUsername;
    instance.dueDate = json.dueDate;
    instance.votes = json.votes;

    return instance;
  }
}
