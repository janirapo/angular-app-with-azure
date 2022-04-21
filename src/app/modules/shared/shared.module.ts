import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { FormsModule } from '@angular/forms';

//
@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, FormsModule],
  exports: [FormsModule, ...fromComponents.components],
})
export class SharedModule {}
