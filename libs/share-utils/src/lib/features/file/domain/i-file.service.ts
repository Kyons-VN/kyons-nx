import { Observable } from "rxjs";
import { FileData, FilePlaceholder } from "../data";

interface IFileService {
  accept: string;
  listFiles(userId: string): Observable<FileData[]>;
  // listFilesByChatId(chatId: string): Promise<FileData[]>;
  // listFilesByChatIds(chatIds: string[]): Promise<FileData[]>;
  // listFilesByBucketId(bucketId: string): Promise<FileData[]>;
  // listFilesByBucketIds(bucketIds: string[]): Promise<FileData[]>;
  uploadFile(userId: string, file: File, image: FilePlaceholder): Observable<FileData>;
  deleteFile(userId: string, fileId: string): Observable<boolean>;
  getFile(userId: string, fileId: string): Observable<FileData | null>;
  updateFileName(userId: string, fileId: string, name: string): Observable<boolean>;
  getCapacity(userId: string): Observable<number>;
}

export { IFileService };

