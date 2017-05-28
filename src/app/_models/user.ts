export class User {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  visibility: string;
  rank: number;

  constructor() {

  }

  static buildFromJson(json: any): User {
    const instance = new User();

    instance.id = json.id;
    instance.username = json.username;
    instance.email = json.email;
    instance.name = json.name;
    instance.surname = json.surname;
    instance.visibility = json.visibility;
    instance.rank = Math.ceil(json.rank * 100);

    return instance;
  }
}
