import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FileData, FilePlaceholder } from '@share-utils/data';
import { IFileService } from '@share-utils/domain';

@Component({
  selector: 'file-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatIconModule, MatPaginatorModule],
  templateUrl: './file-selection.component.html',
  styles: [`
.table-responsive {
  display: flex;
  width: 100%;
  height: calc(100vh - 380px);
  overflow-x: auto;
  position: relative;
  border-radius: 10px;
  #fileTable{
    @apply w-full min-w-[700px] h-fit;
  }
}
  `],
})
export class FileSelectionComponent implements OnInit, AfterViewInit {
  // fileService = inject(FileService);

  private _files: FileData[] = [];
  searchFile = '';
  dataSource: MatTableDataSource<FileData> = new MatTableDataSource<FileData>([]);
  displayedColumns: string[] = ['name'
    , 'mimeType', 'size', 'createdAt'
  ];
  loading = true;

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @Input() useService: boolean = false;
  @Input() userId: string = '';
  @Input() fileService!: IFileService;
  @Output() fileClicked = new EventEmitter<FileData>();

  ngOnInit(): void {
    if (this.useService) {
      this.update();
    }
  }

  update() {
    this.loading = true;
    this.fileService.listFiles(this.userId).subscribe({
      next: (data) => {
        this._files = data;
        this.dataSource = new MatTableDataSource<FileData>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }

  updateFile(file: FileData) {
    this._files.find(file => file.id === file.id)!.name = file.name;
    this.dataSource.data = this._files;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.paginator._intl.nextPageLabel = 'Trang kế';
    this.paginator._intl.previousPageLabel = 'Trang trước';
    this.paginator._intl.itemsPerPageLabel = 'Mỗi trang hiện:';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} trong ${length}`;
    };
  }

  onSearchChat() {
    this.dataSource.filter = this.searchFile;
  }

  uploadFile(file: File, image: FilePlaceholder, callback: (data: string) => void, errorCallback: (code: number) => void) {
    return this.fileService.uploadFile(this.userId, file, image).subscribe({
      next: (data) => {
        if (data.id != undefined) {
          callback(data.id);
          setTimeout(() => {
            this.update();
          }, 500);
        }
      },
      error: (err) => {
        errorCallback(err.code);
      }
    })
  }

  async deleteFile(fileId: string) {
    return this.fileService.deleteFile(this.userId, fileId).subscribe({
      next: (result) => {
        if (result) { setTimeout(() => { this.update(); }, 500) }
        return result;
      }
    });
  }

}
