import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpErrorHandlerService } from '@core/services';

import { MessageService } from './../../core/services/message/message.service';

import { WeatherComponent } from './weather.component';

//
@NgModule({
  declarations: [WeatherComponent],
  imports: [CommonModule],
  exports: [FormsModule, WeatherComponent],
  providers: [HttpErrorHandlerService, MessageService],
})
export class WeatherModule {}
