import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import * as fromComponents from './components';

//
@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, FormsModule, MatButtonModule],
  exports: [FormsModule, ...fromComponents.components],
})
export class SharedModule {}
