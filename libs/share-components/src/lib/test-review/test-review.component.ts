import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'kyonsvn-test-review',
  templateUrl: './test-review.component.html',
  styleUrls: ['./test-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestReviewComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-col gap-4';

  @Input() reviewRenderObject!: any[];

  ngOnInit(): void {
    this.reviewRenderObject = this.reviewRenderObject.map((review) => {
      review.isOpen = false;
      return review;
    });
  }
}
