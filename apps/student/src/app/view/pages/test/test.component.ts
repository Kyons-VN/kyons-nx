import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from '@data/ai/ai.service';
import { LatexComponent } from '@share-components';

@Component({
  standalone: true,
  imports: [FormsModule, LatexComponent],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  aiService = inject(AiService)
  isThinking = false;
  prompt = 'Giải bài toán này bằng tiếng Việt, lời giải format chuẩn markdown và latex'
  image: string | null = null;
  image64 = '';
  result = '';
  mimeType = 'image/jpg';

  ngOnInit(): void {
    console.log();

  }

  onCtrlEnter() {
    this.prompt += '\n';
  }

  onEnter() {
    this.ask();
  }

  onFileSelected(event: Event) {
    if (event.target == null) return;
    const target = event.target as HTMLInputElement;
    // const files = target.files as FileList;
    // convertFile(files[0]).subscribe(base64 => {
    //   this.image = base64;
    // });
    const reader = new FileReader();
    if (target.files && target.files[0]) {
      reader.readAsDataURL(target.files[0]);
      reader.onloadend = () => {
        const result = reader.result as string;
        const splits = result.split(',')
        this.image = splits[1];
        this.image64 = reader.result as string;
        if (splits[0].includes('image/png')) {
          this.mimeType = 'image/png'
        }
        else if (splits[0].includes('image/jpg')) {
          this.mimeType = 'image/jpg'
        }
      };
    }
  }

  ask() {
    this.isThinking = true;
    this.aiService.ask(this.prompt, this.image ?? '', this.mimeType).subscribe({
      next: (res: any) => {
        console.log(res);
        this.result = res.data.text;
        this.isThinking = false;
      }
    });
  }
}

// function convertFile(file: File): Observable<string> {
//   const result = new ReplaySubject<string>(1);
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = (event) => event.target != null && event.target.result != null ? result.next(btoa(event.target.result.toString())) : '';
//   return result;
// }