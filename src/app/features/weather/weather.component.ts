import { Component, OnInit } from '@angular/core';

import { WeatherService, WeatherApiResponse } from './weather.service';

interface WeatherInfo {
  place: string;
  main: string;
  description: string;
  temp: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  pressure: number;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  providers: [WeatherService],
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherInfo?: WeatherInfo;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService
      .getWeather()
      .subscribe((response) => this.setWeatherInfo(response));
  }

  private setWeatherInfo(apiResponse?: WeatherApiResponse): void {
    if (!apiResponse) {
      return;
    }

    this.weatherInfo = {
      place: apiResponse.name,
      main: apiResponse.weather[0].main,
      description: apiResponse.weather[0].description,
      temp: apiResponse.main.temp,
      feelsLike: apiResponse.main.feels_like,
      tempMax: apiResponse.main.temp_max,
      tempMin: apiResponse.main.temp_min,
      humidity: apiResponse.main.humidity,
      pressure: apiResponse.main.pressure,
    };
  }
}
