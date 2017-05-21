import { User } from "app/_models/user";
import { Comment } from "app/_models/comment";

export class Proposal {
  id: string;
  title: string;
  brief: string;
  source: string;
  motivation: string;
  measures: string;
  status: string;

  authorUsername: string;

  comments: Comment[];

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

    return instance;
  }
}
