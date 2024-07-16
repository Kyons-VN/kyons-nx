import { pick } from "lodash-es";
import { formattedDate } from "../../../utils/formats";

class FileData {
  bucketId: string;
  id: string;
  name: string;
  mimeType: string;
  fileUri: string;
  createdAt: Date;
  updatedAt: Date;
  extension: string;
  size: number;
  dateDisplay: string;
  sizeDisplay: string;
  typeDisplay: string;
  chatIds?: string[];
  isImage: boolean;
  isPdf: boolean;
  isText: boolean;
  isAudio: boolean;
  isVideo: boolean;
  constructor({
    bucketId,
    id,
    name,
    mimeType,
    fileUri,
    createdAt,
    updatedAt,
    extension,
    size,
    chatIds,
  }
    : {
      bucketId: string,
      id: string,
      name: string
      mimeType: string,
      fileUri: string,
      createdAt: Date,
      updatedAt: Date,
      extension: string,
      size: number,
      chatIds?: string[]
    }) {
    this.bucketId = bucketId;
    this.id = id;
    this.name = name;
    this.mimeType = mimeType;
    this.fileUri = fileUri;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.extension = extension;
    this.size = size;
    this.chatIds = chatIds;
    this.isImage = this.mimeType.split("/")[0] === "image";
    this.isPdf = this.mimeType == 'application/pdf';
    this.isText = this.mimeType.split("/")[0] === "text";
    this.isAudio = this.mimeType.split("/")[0] === "audio";
    this.isVideo = this.mimeType.split("/")[0] === "video";

    // After detected file type
    this.dateDisplay = formattedDate(this.createdAt);
    this.sizeDisplay = this.getSizeDisplay();
    this.typeDisplay = this.getTypeDisplay();
  }

  private getSizeDisplay() {
    return Math.round(this.size / 1024) + " KB";
  }

  private getTypeDisplay() {
    if (this.isImage) {
      return "Hình ảnh"
    } else if (this.isPdf) {
      return "PDF"
    } else if (this.isText) {
      return "Tài liệu"
    } else if (this.isAudio) {
      return "Âm thanh"
    } else if (this.isVideo) {
      return "Video"
    }
    return "Tập tin";
  }

  static fromJson(jsonObject: any) {
    const _ = pick(jsonObject, [
      'bucketId',
      'id',
      'name',
      'mimeType',
      'fileUri',
      'createdAt',
      'updatedAt',
      'extension',
      'size',
      'chatIds',
    ]);
    if (!_.bucketId) return FileData.deletedFile();
    _.fileUri = jsonObject['publicUri'];
    _.createdAt = new Date(_.createdAt._seconds * 1000);
    _.updatedAt = new Date(_.updatedAt._seconds * 1000);
    return new FileData(_);
  }

  toJson() {
    return {
      'bucketId': this.bucketId,
      'name': this.name,
      'id': this.id,
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

  static empty() {
    return new FileData({
      bucketId: '',
      id: '',
      name: '',
      mimeType: '',
      fileUri: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      extension: '',
      size: 0
    });
  }

  static deletedFile() {
    const file = FileData.empty();
    file.id = 'deleted';
    return file;
  }

  isEmpty() {
    return this.id === '';
  }
}

class FilePlaceholder {
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
  // toJson(): Record<string, unknown> {
  //   return {
  //     'fileData': { 'fileUri': this.uri, 'mimeType': 'image/png' }
  //   }
  // }

  // toPart(): IFileDataPart {
  //   return {
  //     'fileData': { fileUri: this.uri ?? '', 'mimeType': 'image/png' }
  //   }
  // }

  static fromFileData(file: FileData): FilePlaceholder | null {
    const image = new FilePlaceholder(file.name, file.mimeType, file.size);
    image.uri = file.fileUri;
    if (file.isImage) image.base64 = file.fileUri;
    return image;
  }

}

class Capacity {
  storageSize: number;
  maxStorageSize: number;
  percent: number;
  sizeDisplay: string;
  maxSizeDisplay: string;
  constructor({ storageSize, maxStorageSize }: { storageSize: number, maxStorageSize: number }) {
    this.storageSize = storageSize;
    this.maxStorageSize = maxStorageSize;
    this.percent = this._getPercent();
    this.sizeDisplay = (this.storageSize / (1024 * 1024)).toFixed(2);
    this.maxSizeDisplay = (this.maxStorageSize / (1024 * 1024)) + "MB";
  }

  static fromJson(data: any): any {
    const _ = pick(data, ['storageSize', 'maxStorageSize']);
    return new Capacity(_);
  }

  private _getPercent() {
    return Math.round((this.storageSize / this.maxStorageSize) * 100);
  }
}

export { Capacity, FileData, FilePlaceholder };

