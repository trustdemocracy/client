export class Vote {
  proposalId: string;
  userId: string;
  option: string;
  rank: number;
  proposalLocked: boolean;

  constructor() {

  }

  static buildFromJson(json: any): Vote {
    const instance = new Vote();

    instance.proposalId = json.proposalId;
    instance.userId = json.userId;
    instance.option = json.option;
    instance.rank = Math.ceil(json.rank * 100) / 100;
    instance.proposalLocked = json.proposalLocked;

    return instance;
  }
}
