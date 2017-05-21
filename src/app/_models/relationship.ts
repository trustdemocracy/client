export class Relationship {
  originId: string;
  originUsername: string;
  targetId: string;
  targetUsername: string;
  status: string;
  type: string;

  constructor() {

  }

  static buildFromJson(json: any): Relationship {
    const instance = new Relationship();

    instance.originId = json.originUserId;
    instance.originUsername = json.originUserUsername;
    instance.targetId = json.targetUserId;
    instance.targetUsername = json.targetUserUsername;
    instance.status = json.relationshipStatus;
    instance.type = json.relationshipType;

    return instance;
  }
}
