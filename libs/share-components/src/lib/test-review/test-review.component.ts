import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

interface Review {
  topic: string;
  isOpen: boolean;
}

@Component({
  selector: 'kyonsvn-test-review',
  templateUrl: './test-review.component.html',
  styleUrls: ['./test-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestReviewHtmlComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-col gap-4';

  @Input() reviewRenderObject!: Review[];

  ngOnInit(): void {
    this.reviewRenderObject = this.reviewRenderObject.map(review => {
      review.isOpen = false;
      return review;
    });
  }
}
