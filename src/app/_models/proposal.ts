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

  removeVote(rank: number, previouslyVoted: string) {
    switch (previouslyVoted) {
      case 'FAVOUR':
        this.votes.FAVOUR = Math.ceil((this.votes.FAVOUR - rank) * 100) / 100;
        break;
      case 'AGAINST':
        this.votes.AGAINST = Math.ceil((this.votes.AGAINST - rank) * 100) / 100;
        break;
    }
  }

  addVote(vote: Vote) {
    let rank = vote.rank;
    switch (vote.option) {
      case 'FAVOUR':
        this.votes.FAVOUR = Math.ceil((this.votes.FAVOUR + rank) * 100) / 100;
        break;
      case 'AGAINST':
        this.votes.AGAINST = Math.ceil((this.votes.AGAINST + rank) * 100) / 100;
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

    for (let key in instance.votes) {
      instance.votes[key] = Math.ceil(instance.votes[key] * 100) / 100;;
    }

    return instance;
  }
}
