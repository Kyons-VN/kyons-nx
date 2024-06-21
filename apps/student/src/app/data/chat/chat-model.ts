import { IChat, IContent, IFileDataPart, IPart, Role } from "@domain/chat/i-content";
import { formattedDate, toNonAccentVietnamese } from "@share-utils/formats";
import { pick } from "lodash-es";

class Content implements IContent {
  role: Role;
  parts: (Part)[];
  isModel: boolean;
  isUser: boolean;
  createdAt: Date;
  constructor(role: Role, parts: (Part)[], createdAt: Date) {
    this.role = role;
    this.parts = parts;
    this.isModel = role === Role.model;
    this.isUser = role === Role.user;
    this.createdAt = createdAt;
  }
  static parseContent({ role, parts, createdAt }: { role: string; parts: { [key: string]: string }[], createdAt: { _seconds: number } }) {
    return new Content(
      role === "user" ? Role.user : Role.model,
      parts.map((part) => Part.parsePart(part)),
      new Date(createdAt._seconds * 1000),
    );
  }

  static outOfMana(): Content {
    return new Content(
      Role.model,
      [
        new TextPart('Bạn đã hỏi hết giới hạn ngày hôm nay mất rồi :-( Giới hạn sẽ được tự động hồi phục vào lúc 00:00 ngày mai. Hãy quay lại sau lúc đó để hỏi thêm câu hỏi bạn nha!')
      ],
      new Date(),
    );
  }
}

class Part implements IPart {
  toJson() {
    return {};
  }
  isText = false;
  isData = false;
  text?: string;
  fileId?: string;
  url?: string;
  mimeType?: string;
  static parsePart(jsonObject: any) {

    // return switch (jsonObject) {
    //   {'text': final String text} => TextPart(text),
    //   {'inlineData': {'mimeType': String _, 'data': String _}} =>
    //     throw UnimplementedError('inlineData content part not yet supported'),
    //   _ => throw FormatException('Unhandled Part format', jsonObject),
    // };
    if (jsonObject.text) {
      return new TextPart(jsonObject.text);
    } else if (jsonObject.fileId) {
      return new FilePart(jsonObject.fileId);
    }
    throw new Error('Unhandled Part format');
  }
}

class TextPart extends Part {
  // override url: string;
  hasPlayBtn: boolean;
  override isText = true;
  constructor(text: string) {
    super();
    this.text = text;
    this.hasPlayBtn = this.text.includes('/play');
  }
  override toJson() {
    return { text: this.text };
  }
}

class FilePart extends Part {
  // mimeType?: string;
  // url?: string;
  override isData = true;
  id: string;
  base64?: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  override toJson(): Record<string, unknown> {
    return {
      'fileId': this.id
    }
  }

  static empty() {
    return new FilePart('');
  }
}

class Chat implements IChat {
  id: string;
  createdAt: Date;
  firstMessage: string;
  search: string;
  messages: Content[] = [];
  dateDisplay: string;
  constructor(id: string, createdAt: Date, firstMessage: string) {
    this.id = id;
    this.firstMessage = firstMessage;
    this.createdAt = createdAt;
    this.dateDisplay = formattedDate(this.createdAt);
    this.search = toNonAccentVietnamese(this.firstMessage);
  }
  static fromJson({
    id,
    createdAt,
    firstMessage,
  }: {
    id: string;
    createdAt: { _seconds: number };
    messages: { role: string; parts: { text: string }[] }[];
    firstMessage: string;
  }) {
    const createdAtDate = new Date(createdAt._seconds * 1000); // Convert Firebase moment time to TypeScript
    return new Chat(id, createdAtDate, firstMessage);
  }

  updateMessages(messages: Content[]) {
    this.messages = messages;
  }
}

class Mana {
  value: number;
  max: number;
  constructor(value: number, max: number) {
    this.value = value;
    this.max = max;
  }
  static invalid() { return new Mana(-1, -1) };
}

enum ChatErrorCode {
  UserNotFound = 1,
  NoPrompt = 2,
  OutOfMana = 3,
}

class ChatError {
  message: string;
  code: ChatErrorCode;
  constructor(message: string, errorCode: number) {
    this.message = message;
    this.code = errorCode;
  }
}

class Image {
  name: string;
  size: number;
  uri?: string;
  base64?: string;
  mimeType: string;

  constructor(name: string, mimeType: string, size: number) {
    this.mimeType = mimeType;
    this.name = name;
    this.size = size;
  }
  toJson(): Record<string, unknown> {
    return {
      'fileData': { 'fileUri': this.uri, 'mimeType': 'image/png' }
    }
  }

  toPart(): IFileDataPart {
    return {
      'fileData': { fileUri: this.uri ?? '', 'mimeType': 'image/png' }
    }
  }
}

class FileData {
  mimeType: string;
  fileUri: string;
  createdAt: Date;
  updatedAt: Date;
  extension: string;
  size: number;
  constructor({
    mimeType,
    fileUri,
    createdAt,
    updatedAt,
    extension,
    size
  }
    : {
      mimeType: string,
      fileUri: string,
      createdAt: { _seconds: number },
      updatedAt: { _seconds: number },
      extension: string,
      size: number,
    }) {
    this.mimeType = mimeType;
    this.fileUri = fileUri;
    this.createdAt = new Date(createdAt._seconds * 1000);
    this.updatedAt = new Date(updatedAt._seconds * 1000);
    this.extension = extension;
    this.size = size;
  }

  static fromJson(jsonObject: any) {
    const _ = pick(jsonObject, [
      'mimeType',
      'fileUri',
      'createdAt',
      'updatedAt',
      'extension',
      'size',
    ]);
    _.fileUri = jsonObject['publicUri'];
    _.createdAt = new Date(_.createdAt._seconds * 1000);
    _.updatedAt = new Date(_.updatedAt._seconds * 1000);
    return new FileData(_);
  }

  toJson() {
    return {
      'mimeType': this.mimeType,
      'publicUri': this.fileUri,
      'createdAt': {
        _seconds: Math.floor(this.createdAt.getTime() / 1000),
      },
      'updatedAt': {
        _seconds: Math.floor(this.updatedAt.getTime() / 1000),
      },
      'extension': this.extension,
      'size': this.size
    }
  }
}

export { Chat, ChatError, Content, FileData, FilePart, Image, Mana, Part, TextPart };

