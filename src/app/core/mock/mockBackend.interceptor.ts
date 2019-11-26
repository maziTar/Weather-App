import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

import {AppHttpResponse} from './mockBackend.model';

import {ajax} from 'rxjs/ajax';
import {environment} from '../../../environments/environment';
import {
  ACCUWEATHER_API_5DAYS_OF_FORECASTS_URL,
  ACCUWEATHER_API_AUTOCOMPLETE_URL,
  ACCUWEATHER_API_CONDITIONS_URL
} from '../../shared/consts/weather.consts';
import {EResultCodes} from '../models/api.models';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private readonly apiAutocompleteNamespace = ACCUWEATHER_API_AUTOCOMPLETE_URL;
  private readonly apiConditionsNamespace = ACCUWEATHER_API_CONDITIONS_URL;
  private readonly apiForecastNamespace = ACCUWEATHER_API_5DAYS_OF_FORECASTS_URL;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(
        mergeMap(() => {
          if (request.url.includes(this.apiAutocompleteNamespace) && request.method === 'GET') {
            return this.getApiCall(request, next, 'GetAccuweatherAutocomplete');
          } else if (request.url.includes(this.apiConditionsNamespace) && request.method === 'GET') {
            return this.getApiCall(request, next, 'GetAccuweatherCurrentConditions');
          } else if (request.url.includes(this.apiForecastNamespace) && request.method === 'GET') {
            return this.getApiCall(request, next, 'GetAccuweather5DaysOfForecast');
          }
          // pass through any requests not handled above
          return next.handle(request);
        })
      );
  }

  getApiCall(request: HttpRequest<any>, next: HttpHandler, mockFileName: string): Observable<HttpEvent<any>> {
    const url = `/assets/mock/${mockFileName}.json`;
    return ajax.getJSON(url)
      .pipe(
        map(body => new HttpResponse({status: EResultCodes.Success, body: AppHttpResponse(body)}))
      );
  }

}


