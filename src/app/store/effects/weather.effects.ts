import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as weatherAction from '../actions/weather.actions';
import {WeatherService} from '../../shared/services/weather.service';
import {
  ACCUWeatherAutocompleteResultsViewModel,
  CurrentConditionsViewModel,
  FiveDaysOfForecastViewModel
} from '../../shared/models/weather-view.models';
import {
  IACCUWeatherAutocompleteResponse,
  IGet5DaysOfForecastResponse,
  IGetCurrentConditionsResponse
} from '../../shared/models/weather-response.models';

@Injectable()
export class WeatherEffects {

  @Effect()
  getWeatherAutocomplete$: Observable<Action> = this.actions$.pipe(
    ofType(weatherAction.getWeatherAutocomplete),
    switchMap((action) => {
      return this.weatherApiService.getAutocompleteResults(action.data).pipe(
        catchError(
          (err) => of(weatherAction.getWeatherAutocompleteFailure({error: err}))),
      );
    }),
    map((data: IACCUWeatherAutocompleteResponse[]) => {
      return weatherAction.getWeatherAutocompleteSuccess({
        data:
          (new ACCUWeatherAutocompleteResultsViewModel(data).autocompleteResults)
      });
    })
  );
  @Effect()
  getWeatherAutocompleteSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(weatherAction.getWeatherAutocompleteSuccess),
    map((data) => weatherAction.setWeatherAutocomplete(data))
  );
  @Effect()
  setCurrentSelectedPlaceWeather$: Observable<Action> = this.actions$.pipe(
    ofType(weatherAction.getCurrentSelectedPlaceWeather),
    switchMap((action) => {
      return this.weatherApiService.getCurrentSelectedPlaceForecast(action.data).pipe(
        catchError(
          (err) => of(weatherAction.getCurrentSelectedPlaceWeatherFailure({error: err}))),
      );
    }),
    map((data: IGetCurrentConditionsResponse) => {
      return weatherAction.getCurrentSelectedPlaceWeatherSuccess({
        data:
          (new CurrentConditionsViewModel(data))
      });
    })
  );
  @Effect()
  getCurrentSelectedPlaceWeatherSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(weatherAction.getCurrentSelectedPlaceWeatherSuccess),
    map((data) => weatherAction.setCurrentSelectedPlaceWeather(data))
  );
  @Effect()
  getFiveDailyWeatherForecasts$: Observable<Action> = this.actions$.pipe(
    ofType(weatherAction.getFiveDailyWeatherForecasts),
    switchMap((action) => {
      return this.weatherApiService.get5DaysOfDailyForecasts(action.data).pipe(
        catchError(
          (err) => of(weatherAction.getFiveDailyWeatherForecastsFailure({error: err}))),
      );
    }),
    map((data: IGet5DaysOfForecastResponse) => {
      return weatherAction.getFiveDailyWeatherForecastsSuccess({
        data:
          (new FiveDaysOfForecastViewModel(data).forecasts)
      });
    })
  );
  @Effect()
  getFiveDailyWeatherForecastsSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(weatherAction.getFiveDailyWeatherForecastsSuccess),
    map((data) => weatherAction.setFiveDailyWeatherForecasts(data))
  );

  constructor(private actions$: Actions,
              private weatherApiService: WeatherService
  ) {
  }
}
