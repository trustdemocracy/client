export class Proposal {
  id: string;
  title: string;
  brief: string;
  source: string;
  motivation: string;
  measures: string;
  status: string;

  authorUsername: string;

  constructor() {
  }

  static buildFromJson(json: any): Proposal {
    const instance = new Proposal();

    instance.id = json.id;
    instance.title = json.title;
    instance.brief = json.brief;
    instance.source = json.source;
    instance.motivation = json.motivation;
    instance.measures = json.measures;
    instance.authorUsername = json.authorUsername;

    return instance;
  }
}
