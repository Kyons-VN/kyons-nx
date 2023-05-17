import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RankTextComponent } from '@view/components/rank-ss/rank-ss.component';
import { FacebookModule } from 'ngx-facebook';

@Component({
  standalone: true,
  imports: [CommonModule, FacebookModule, FormsModule, ReactiveFormsModule, RankTextComponent],
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss'],
})
export class WaitingListComponent implements AfterViewInit {
  route = inject(ActivatedRoute);

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.body.classList.add('modal-open');
    });
  }
}
