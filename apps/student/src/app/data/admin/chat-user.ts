import { Chat } from "@data/chat/chat-model";

export default class ChatUser {
  id: string;
  email: string;
  history: Chat[] | null = null;
  constructor({ id, email }: { id: string; email: string }) {
    this.id = id;
    this.email = email;
  }

  static fromJson(json: { id: string; email: string }) {
    return new ChatUser(json);
  }
}