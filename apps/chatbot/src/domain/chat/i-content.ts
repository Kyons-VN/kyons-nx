enum Role {
  user,
  model,
}

interface IPart {
  toJson(): Record<string, unknown>;
  isText: boolean;
  isData: boolean;
}

interface IContent {
  role: Role;
  parts: IPart[];
}

interface IChat {
  id: string;
  createdAt: Date;
  firstMessage: string;
  messages: IContent[];
  dateDisplay: string;
}

export { IChat, IContent, IPart, Role };

