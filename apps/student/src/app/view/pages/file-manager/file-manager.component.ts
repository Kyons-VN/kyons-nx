import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, HostBinding, inject, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ChatService } from '@data/chat/chat.service';
import { FileService } from '@data/file/file.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { UserService } from '@data/user/user.service';
import { Capacity, Chat, FileData, FilePlaceholder } from '@share-utils/data';
import { FileSelectionComponent } from '@view/share-components/file-selection/file-selection.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FileSelectionComponent, MatIconModule],
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent implements OnInit {
  @HostBinding('class') class = 'app-full items-center relative chat';

  fileService = inject(FileService);
  userService = inject(UserService);
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  chatService = inject(ChatService);
  paths = inject(NavigationService).paths;

  capacity: Capacity | null = null;
  userId = '';
  files: FileData[] | null = null;
  detail: FileData = FileData.empty();
  edittingDetail = false;
  updatingDetail = false;
  fileName = '';
  image: FilePlaceholder | null = null;
  file!: File;
  showConfirmDelete = false;
  accetp = this.fileService.accept;
  detailChats: Chat[] | null = null;
  router = inject(Router);

  // searchFile = '';
  // dataSource: MatTableDataSource<FileData> = new MatTableDataSource<FileData>([]);
  // displayedColumns: string[] = ['name'
  //   , 'mimeType', 'size', 'createdAt'
  // ];
  // onSearchChat() { }

  isSmMenuHide = signal(true);

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild(FileSelectionComponent) selection!: FileSelectionComponent;

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.updateCapacity();
  }

  updateCapacity() {
    this.fileService.getCapacity(this.userId).subscribe({
      next: (res) => {
        this.capacity = res;
      }
    })
  }

  // ngAfterViewInit() {
  //   this.paginator._intl.nextPageLabel = 'Trang kế';
  //   this.paginator._intl.previousPageLabel = 'Trang trước';
  //   this.paginator._intl.itemsPerPageLabel = 'Mỗi trang hiện:';
  //   this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
  //     const start = page * pageSize + 1;
  //     const end = (page + 1) * pageSize;
  //     return `${start} - ${end} trong ${length}`;
  //   };
  // }

  toggleMenu() {
    this.isSmMenuHide.set(!this.isSmMenuHide());
    this.isSmMenuHide() ? this.renderer.removeClass(this.document.body, 'overflow-hidden') : this.renderer.addClass(this.document.body, 'overflow-hidden');
  }



  openDetails(file: FileData) {
    this.detail = file;
    this.fileName = file.name;
    this.edittingDetail = false;
    this.updatingDetail = false;
    this.isSmMenuHide.set(false);
  }

  updateFileName() {
    this.updatingDetail = true;
    if (this.detail.isEmpty()) return;
    this.fileService.updateFileName(this.userId, this.detail.id, this.fileName).subscribe({
      next: (success) => {
        if (!success) {
          alert('Có lỗi');
        }
        this.updatingDetail = false;
        this.edittingDetail = false;
        this.detail.name = this.fileName;
        this.selection.updateFile(this.detail);
      }
    })
  }

  hideDetail() {
    this.detail = FileData.empty();
  }

  onFileSelected($event: Event) {
    if ($event.target == null) return;
    const target = $event.target as HTMLInputElement;
    // convertFile(files[0]).subscribe(base64 => {
    //   this.image = base64;
    // });
    const reader = new FileReader();
    if (target.files && target.files[0]) {
      const file = target.files[0];
      if (file.type.split('/')[0] !== 'image' && file.size > 5 * 1024 * 1024) {
        alert("Không thể tải ảnh lớn hơn 5 MB");
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert("Không thể tải tập tin lớn hơn 15 MB");
      }
      this.file = file;
      this.image = new FilePlaceholder(this.file.name, this.file.type, this.file.size);
      reader.readAsDataURL(file);
      reader.onloadend = this.onloadend.bind(this, reader);
    }
  }

  onloadend(reader: FileReader) {
    if (this.image == null) return;
    const result = reader.result as string;
    const splits = result.split(',');
    this.image.base64 = reader.result as string;
    if (splits[0].includes('image/png')) {
      this.image.mimeType = 'image/png'
    }
    else if (splits[0].includes('image/jpg')) {
      this.image.mimeType = 'image/jpg'
    }
    this.selection.uploadFile(this.file, this.image, (fileId) => {
      this.updateCapacity();
    }, (code) => {
      if (code === 8) {
        alert('Không đủ dung lượng bộ nhớ');
      }
      else if (code === 8) {
        alert('Không đủ dung lượng bộ nhớ');
      }
    });
  }

  showConfirmDeleteDialog() {
    this.chatService.getChatsByIds(this.userId, this.detail.chatIds ?? []).subscribe({
      next: (chats) => {
        this.detailChats = chats;
        this.showConfirmDelete = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteFile() {
    this.selection.deleteFile(this.detail.id).then(() => {
      this.showConfirmDelete = false;
      this.detail = FileData.empty();
      this.isSmMenuHide.set(true);
      setTimeout(() => {
        this.updateCapacity();
      }, 500)
    });
  }

  openChat(chat: Chat) {
    window.open(this.paths.chat.path.replace(':id', chat.id), '_blank');
  }

}
