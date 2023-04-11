import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'wl-rank-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rank-ss.component.html',
})
export class RankTextComponent {
  @Input() imageRank = '';
}
