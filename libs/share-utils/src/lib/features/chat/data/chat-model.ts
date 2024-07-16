import { formattedDate, toNonAccentVietnamese } from "../../../utils";
import { FileData } from "../../file/data";
import { IChat, IContent, IPart, Role } from "../domain";

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

  static unknownError(code: number): Content {
    return new Content(
      Role.model,
      [
        new TextPart(`Lỗi ${code}, vui lòng thử lại sau!`)
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
  isDeleted = false;
  text?: string;
  fileId?: string;
  url?: string;
  mimeType?: string;
  data?: FileData;
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
    this.search = toNonAccentVietnamese(this.firstMessage).toLocaleLowerCase();
  }
  static fromJson({
    id,
    createdAt,
    firstMessage,
  }: {
    id: string;
    createdAt: { _seconds: number };
    messages: { role: string; parts: { text: string }[] }[];
    firstMessage: string | null;
  }) {
    const createdAtDate = new Date(createdAt._seconds * 1000); // Convert Firebase moment time to TypeScript
    return new Chat(id, createdAtDate, firstMessage ?? '');
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
  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }
}


export { Chat, ChatError, Content, FilePart, Mana, Part, TextPart };

