import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Package } from '@data/order/package';
import { SafeHtmlPipe } from '@share-pipes';

@Component({
  selector: 'student-package-display',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './package-display.component.html'
})
export class PackageDisplayComponent {
  @Input() pk!: Package;
}
