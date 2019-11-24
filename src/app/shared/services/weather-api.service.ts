import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpService} from '../../core/services/http.service';
import {AppResponse} from '../../core/models/api.models';
import {Observable} from 'rxjs';
import {
  ACCUWEATHER_API_5DAYS_OF_FORECASTS_URL,
  ACCUWEATHER_API_AUTOCOMPLETE_URL,
  ACCUWEATHER_API_CONDITIONS_URL
} from '../consts/weather.consts';
import {
  IACCUWeatherAutocompleteResponse,
  IGet5DaysOfForecastResponse,
  IGetCurrentConditionsResponse
} from '../models/weather-response.models';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly apiAutocompleteNamespace = ACCUWEATHER_API_AUTOCOMPLETE_URL;
  private readonly apiConditionsNamespace = ACCUWEATHER_API_CONDITIONS_URL;
  private readonly apiForecastNamespace = ACCUWEATHER_API_5DAYS_OF_FORECASTS_URL;
  private readonly apiBaseUrlNamespace = environment.ACCUWEATHER_API_BASE_URL;
  private readonly apiKeyNamespace = environment.ACCUWEATHER_API_KEY;

  constructor(private http: HttpService) {
  }

  public getAutocompleteResults(query: string): Observable<AppResponse<IACCUWeatherAutocompleteResponse[]>> {
    const url = `${this.apiBaseUrlNamespace}/${this.apiAutocompleteNamespace}`;
    return this.http.get<IACCUWeatherAutocompleteResponse[]>(`${url}`, {
      params: {
        apikey: this.apiKeyNamespace,
        q: query ? query : 'tel',
        language: 'en-us'
      }
    });
  }

  public getCurrentConditions(locationKey: string): Observable<AppResponse<IGetCurrentConditionsResponse>> {
    return this.http.get<IGetCurrentConditionsResponse>
    (`${this.apiBaseUrlNamespace}/${this.apiConditionsNamespace}/${locationKey}`, {
      params: {
        language: 'en-us',
        apikey: this.apiKeyNamespace,
        details: true
      }
    });
  }

  public get5DaysOfDailyForecasts(locationKey: string): Observable<AppResponse<IGet5DaysOfForecastResponse>> {
    return this.http.get<IGet5DaysOfForecastResponse>
    (`${this.apiForecastNamespace}/${this.get5DaysOfDailyForecasts}/${locationKey}`, {
      params: {
        language: 'en-us',
        apikey: this.apiKeyNamespace,
        details: true,
        metric: true
      }
    });
  }
}
