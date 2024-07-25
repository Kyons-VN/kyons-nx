import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student-task-item-svg',
  templateUrl: './task-item-bg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemBGComponent implements OnInit {
  route = inject(ActivatedRoute);

  @Input() lineColor = '#FDBA74';
  @Input() startShapeColor = '#F5622E';
  @Input() stopShapeColor = '#DB8231';

  ngOnInit(): void {
    // Get route params
    if (this.route.snapshot.queryParamMap.has('lineColor')) this.lineColor = `#${this.route.snapshot.queryParamMap.get('lineColor')}`;
    console.log(this.lineColor);
    if (this.route.snapshot.queryParamMap.has('startShapeColor')) this.startShapeColor = `#${this.route.snapshot.queryParamMap.get('startShapeColor')}`;
    if (this.route.snapshot.queryParamMap.has('stopShapeColor')) this.stopShapeColor = `#${this.route.snapshot.queryParamMap.get('stopShapeColor')}`;
  }

}
