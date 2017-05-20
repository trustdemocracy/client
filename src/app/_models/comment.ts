import { User } from "app/_models/user";

export class Comment {
  id: string;
  proposalId: string;
  rootCommentId: string;
  authorUsername: string;
  content: string;
  timepstamp: number;
  votes: any;

  comments: Comment[] = [];

  constructor() {
  }

  isOwner(user: User): boolean {
    return this.authorUsername === user.username;
  }

  hasComments(): boolean {
    return this.comments && this.comments.length > 0;
  }

  static buildFromJson(json: any): Comment {
    const instance = new Comment();

    instance.id = json.id;
    instance.proposalId = json.proposalId;
    instance.rootCommentId = json.rootCommentId;
    instance.authorUsername = json.authorUsername;
    instance.content = json.content;
    instance.timepstamp = json.timepstamp;
    instance.votes = json.votes;

    return instance;
  }
}
