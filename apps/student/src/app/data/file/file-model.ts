import { IFileDataPart } from "@domain/chat/i-content";
import { formattedDate } from "@share-utils/formats";
import { pick } from "lodash-es";

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
    this.dateDisplay = formattedDate(this.createdAt);
    this.sizeDisplay = this.getSizeDisplay();
    this.typeDisplay = this.getTypeDisplay();
  }

  private getSizeDisplay() {
    return Math.round(this.size / 1024) + " KB";
  }

  private getTypeDisplay() {
    const type = this.mimeType.split("/")[0]
    if (type === "image") {
      return "Hình ảnh"
    } else {
      return "Tập tin"
    }
  }

  isImage() {
    return this.mimeType.split("/")[0] === "image";
  }

  isPdf() {
    return this.mimeType.split("/")[0] === "application" && this.mimeType.split("/")[1] === "pdf";
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
    ]);
    _.fileUri = jsonObject['publicUri'];
    _.createdAt = new Date(_.createdAt._seconds * 1000);
    _.updatedAt = new Date(_.updatedAt._seconds * 1000);
    return new FileData(_);
  }

  toJson() {
    return {
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

  isEmpty() {
    return this.id === '';
  }

  iconDisplay() {
    if (this.mimeType.split("/")[0] === "image") {
      return 'icon-Image';
    }
    return 'icon-File';
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

  static fromFileData(file: FileData): Image | null {
    const image = new Image(file.name, file.mimeType, file.size);
    image.uri = file.fileUri;
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

export { Capacity, FileData, Image };

