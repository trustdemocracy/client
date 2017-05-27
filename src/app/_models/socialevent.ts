export class SocialEvent {
  id: string;
  userId: string;
  username: string;
  type: string;
  timestamp: number;

  constructor() {
  }

  static buildFromJson(json: any): SocialEvent {
    let instance: SocialEvent;
    const type: string = json.type;

    switch (type) {
      case 'PUBLICATION':
        instance = new PublicationEvent(json.serializedContent);
        break;
      case 'MODIFICATION':
        instance = new ModificationEvent(json.serializedContent);
        break;
      case 'COMMENT':
        instance = new CommentEvent(json.serializedContent);
        break;
      case 'VOTE':
        instance = new VoteEvent(json.serializedContent);
        break;
    }

    instance.id = json.id;
    instance.userId = json.userId;
    instance.username = json.username;
    instance.type = type;
    instance.timestamp = json.timestamp;

    return instance;
  }
}

export class PublicationEvent extends SocialEvent {
  proposalId: string;
  title: string;
  brief: string;

  constructor(content: any) {
    super();
    this.proposalId = content.id;
    this.title = content.title;
    this.brief = content.brief;
  }
}

export interface Modification {
  userId: string;
  username: string;
  content: string;
}

export class ModificationEvent extends SocialEvent {
  modificationId: string;
  proposalId: string;
  title: string;
  additions: Modification[];
  deletions: Modification[];

  constructor(content: any) {
    super();
    this.modificationId = content.id;
    this.proposalId = content.proposalId;
    this.title = content.title;
    this.additions = content.additions;
    this.deletions = content.deletions;
  }
}

export class CommentEvent extends SocialEvent {
  commentId: string;
  proposalId: string;
  title: string;
  content: string;

  constructor(content: any) {
    super();
    this.commentId = content.id;
    this.proposalId = content.proposalId;
    this.title = content.title;
    this.content = content.content;
  }
}

export class VoteEvent extends SocialEvent {
  proposalId: string;
  title: string;
  option: string;
  contributed: number;
  favour: number;
  against: number;

  constructor(content: any) {
    super();
    this.proposalId = content.proposalId;
    this.title = content.title;
    this.option = content.option;
    this.contributed = content.contributed;
    this.favour = content.results.FAVOUR;
    this.against = content.results.AGAINST;
  }
}
