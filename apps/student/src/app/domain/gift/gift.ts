class Gift {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson(json: any): Gift {
    return new Gift(json.id, json.name);
  }
}

export { Gift };
