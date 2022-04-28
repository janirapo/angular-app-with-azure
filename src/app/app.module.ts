import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import { MessageService } from '@core/services/message/message.service';
import { WeatherModule } from '@features/weather/weather.module';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    WeatherModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [AppComponent],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
