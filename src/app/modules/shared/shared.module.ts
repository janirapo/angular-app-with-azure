import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

//
@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, FormsModule, MatButtonModule],
  exports: [FormsModule, ...fromComponents.components],
})
export class SharedModule {}
