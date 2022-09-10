import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [OrderByPipe, KeysPipe],
  exports: [OrderByPipe, KeysPipe],
})
export class SharePipesModule { }
