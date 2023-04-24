import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { OrderBySAPipe } from './order-by-sa.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  imports: [OrderBySAPipe],
  declarations: [OrderByPipe, KeysPipe],
  exports: [OrderByPipe, KeysPipe, OrderBySAPipe],
})
export class SharePipesModule { }
