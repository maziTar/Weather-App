import {
  IACCUWeatherAutocompleteResponse,
  IDailyForecast,
  IDailyForecastTemperature,
  IGet5DaysOfForecastResponse,
  IGetCurrentConditionsResponse,
  IUnitDetails
} from './weather-response.models';

// Autocomplete

export class ACCUWeatherAutocompleteViewModel {
  key: string;
  localizedName: string;

  constructor(data: IACCUWeatherAutocompleteResponse | { Key, LocalizedName }) {
    this.key = data.Key;
    this.localizedName = data.LocalizedName;
  }
}

export class ACCUWeatherAutocompleteResultsViewModel {
  autocompleteResults: ACCUWeatherAutocompleteViewModel[] = [];

  constructor(data: IACCUWeatherAutocompleteResponse[]) {
    this.autocompleteResults = this.generateResults(data);
  }

  private generateResults(rawData: IACCUWeatherAutocompleteResponse[]) {
    if (rawData) {
      return rawData.reduce((prev = [], current) => {
        return !prev.length ? [new ACCUWeatherAutocompleteViewModel(current)] : [...prev, new ACCUWeatherAutocompleteViewModel(current)];
      }, []);
    } else {
      return [];
    }
  }
}


// current conditions

export class CurrentConditionsViewModel {
  id: string;
  weatherText: string;
  weatherIcon: number;
  temperature: IUnitDetails;

  constructor(data: IGetCurrentConditionsResponse) {
    this.weatherText = data.WeatherText;
    this.weatherIcon = data.WeatherIcon;
    this.temperature = data.Temperature.Metric;
    this.id = data.LocalObservationDateTime;
  }
}

// daily forecasts

export interface FiveDaysOfForecastViewModel {
  forecasts: IDailyForecastViewModel[];
}

export class FiveDaysOfForecastViewModel {
  forecasts: IDailyForecastViewModel[] = [];

  constructor(data: IGet5DaysOfForecastResponse) {
    this.forecasts = this.generateForecasts(data.DailyForecasts);
  }

  private generateForecasts(rawData: IDailyForecast[]) {
    if (rawData) {
    return rawData.reduce((prev = [], current) => {
      return !prev.length ? [new DailyForecastViewModel(current)] : [...prev, new DailyForecastViewModel(current)];
    }, []);
    } else {
      return [];
    }
  }
}

export interface IDailyForecastViewModel {
  Date: string;
  Temperature: IDailyForecastTemperature;
  DayIcon: number;
  NightIcon: number;
}

export class DailyForecastViewModel {
  Date: string;
  Temperature: IDailyForecastTemperature;
  DayIcon: number;
  NightIcon: number;

  constructor(data: IDailyForecast) {
    this.Date = data.Date;
    this.Temperature = data.Temperature;
    this.DayIcon = data.Day.Icon;
    this.NightIcon = data.Night.Icon;
  }
}
