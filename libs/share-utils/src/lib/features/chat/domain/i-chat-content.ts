enum Role {
  user,
  model,
}

const maxManaWidth = 26;

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

interface IFileDataPart {
  text?: never;
  inlineData?: never;
  functionCall?: never;
  functionResponse?: never;
  fileData: IFileData;
}

interface IFileData {
  mimeType: string;
  fileUri: string;
}

export { IChat, IContent, IFileData, IFileDataPart, IPart, Role, maxManaWidth };

