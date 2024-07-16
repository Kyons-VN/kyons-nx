import { Observable } from "rxjs";
import { FileData, FilePlaceholder } from "../../file/data";
import { Chat, Content, Mana } from "../data";

interface IChatService {
  getGreeting(): Observable<Content>;
  resetLessonChat(userId: any, lessonId: string): Observable<any>;
  sendMessageFile(userId: string, message: string, { lessonContext, file, image, chatId, fileData }: { chatId?: string, lessonContext?: string, file?: File, image?: FilePlaceholder, fileData?: FileData }): Observable<string>;
  getMana(userId: string): Observable<Mana>;
  getMessages(userId: string, chatId: string): Observable<Content[]>;
  getChats(userId: string): Observable<Chat[]>;
  updateChatName(userId: string, chatId: string, name: string): Observable<void>;
  deleteChat(userId: string, chatId: string): Observable<boolean>;
}

export { IChatService };

