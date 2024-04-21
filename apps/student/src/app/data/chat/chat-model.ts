import { IChat, IContent, IPart, Role } from "@domain/chat/i-content";
import { formatedDate } from "@share-utils/formats";
import { Buffer } from "buffer";

class Content implements IContent {
  role: Role;
  parts: (TextPart | DataPart)[];
  isModel: boolean;
  isUser: boolean;
  createdAt: Date;
  constructor(role: Role, parts: (TextPart | DataPart)[], createdAt: Date) {
    this.role = role;
    this.parts = parts;
    this.isModel = role === Role.model;
    this.isUser = role === Role.user;
    this.createdAt = createdAt;
  }
  static parseContent({ role, parts, createdAt }: { role: string; parts: { text: string }[], createdAt: { _seconds: number } }) {
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
  static parsePart(jsonObject: any) {

    // return switch (jsonObject) {
    //   {'text': final String text} => TextPart(text),
    //   {'inlineData': {'mimeType': String _, 'data': String _}} =>
    //     throw UnimplementedError('inlineData content part not yet supported'),
    //   _ => throw FormatException('Unhandled Part format', jsonObject),
    // };
    if (jsonObject.text) {
      return new TextPart(jsonObject.text);
    } else if (jsonObject.inlineData) {
      return new DataPart(jsonObject.inlineData.mimeType, Buffer.from(jsonObject.inlineData.data, 'base64'));
    }
    throw new Error('Unhandled Part format');
  }
}

class TextPart extends Part {
  text: string;
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

class DataPart extends Part {
  mimeType: string;
  bytes: Uint8Array;
  override isData = true;

  constructor(mimeType: string, bytes: Uint8Array) {
    super();
    this.mimeType = mimeType;
    this.bytes = bytes;
  }

  override toJson(): Record<string, unknown> {
    return {
      'inlineData': { 'data': Buffer.from(this.bytes).toString('base64'), 'mimeType': this.mimeType }
    }
  }
}

class Chat implements IChat {
  id: string;
  createdAt: Date;
  firstMessage: string;
  messages: Content[] = [];
  dateDisplay: string;
  constructor(id: string, createdAt: Date, firstMessage: string) {
    this.id = id;
    this.firstMessage = firstMessage;
    this.createdAt = createdAt;
    this.dateDisplay = formatedDate(this.createdAt);
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

export { Chat, Content, DataPart, Mana, Part, TextPart };

