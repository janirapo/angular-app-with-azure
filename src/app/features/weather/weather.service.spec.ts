import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpErrorHandlerService, MessageService } from '@core/services';

import { WeatherService, WeatherApiResponse } from './weather.service';

describe('WeatherService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [WeatherService, HttpErrorHandlerService, MessageService],
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    weatherService = TestBed.inject(WeatherService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getWeather', () => {
    let expectedWeather: WeatherApiResponse;

    beforeEach(() => {
      weatherService = TestBed.inject(WeatherService);
      expectedWeather = {
        weather: [{ id: 800, main: 'Clear', description: 'clear sky' }],
        main: {
          temp: 275.31,
          feels_like: 272.14,
          temp_min: 273.95,
          temp_max: 276.91,
          pressure: 1011,
          humidity: 50,
        },
        name: 'Helsinki',
      };
    });

    it('should return expected response (called once)', () => {
      weatherService.getWeather().subscribe({
        next: (response) =>
          expect(response)
            .withContext('should return expected')
            .toEqual(expectedWeather),
        error: fail,
      });

      // WeatherService should have made one request to GET weather from expected URL
      const req = httpTestingController.expectOne(
        (req) => req.method === 'GET' && req.url === weatherService.weatherUrl,
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock weather
      req.flush(expectedWeather);
    });

    it('should be OK returning null', () => {
      weatherService.getWeather().subscribe({
        next: (response) =>
          expect(response).withContext('should be null').toBeNull(),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        (req) => req.method === 'GET' && req.url === weatherService.weatherUrl,
      );
      req.flush(null); // Respond with null
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into null weather result', () => {
      weatherService.getWeather().subscribe({
        next: (response) =>
          expect(response).withContext('should be null').toBeNull(),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        (req) => req.method === 'GET' && req.url === weatherService.weatherUrl,
      );

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return expected weather (called multiple times)', () => {
      weatherService.getWeather().subscribe();
      weatherService.getWeather().subscribe();
      weatherService.getWeather().subscribe({
        next: (response) =>
          expect(response)
            .withContext('should return expected weather')
            .toEqual(expectedWeather),
        error: fail,
      });

      const requests = httpTestingController.match(
        (req) => req.method === 'GET' && req.url === weatherService.weatherUrl,
      );
      expect(requests.length).withContext('calls to getWeather()').toEqual(3);

      // Respond to each request with different mock weather results
      requests[0].flush(null);
      requests[1].flush([]);
      requests[2].flush(expectedWeather);
    });
  });
});
