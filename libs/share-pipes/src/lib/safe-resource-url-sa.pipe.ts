import { HttpClient } from '@angular/common/http';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'safeResourceUrl',
})
export class SafeResourceUrlSAPipe implements PipeTransform {

  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);

  transform(url: string): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
