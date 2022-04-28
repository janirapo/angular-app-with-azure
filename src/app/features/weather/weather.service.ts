import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandlerService, HandleError } from '@core/services';

interface Weather {
  id: number;
  main: string;
  description: string;
}

interface Main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherApiResponse {
  name: string;
  weather: Weather[];
  main: Main;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'; // URL to web api
  weatherLocation = 'Helsinki,fi';
  apiKey = '3d7d7f48c3c8c403fec37383f4698ea5';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService,
  ) {
    this.handleError = httpErrorHandler.createHandleError('WeatherService');
  }

  /** GET weather from the server */
  getWeather(): Observable<WeatherApiResponse | undefined> {
    const options = {
      params: new HttpParams()
        .set('q', this.weatherLocation)
        .set('APPID', this.apiKey),
    };

    return this.http
      .get<WeatherApiResponse>(this.weatherUrl, options)
      .pipe(catchError(this.handleError('getWeather', undefined)));
  }
}
