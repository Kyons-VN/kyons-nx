import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ standalone: true, name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}