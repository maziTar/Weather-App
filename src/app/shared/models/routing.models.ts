export enum RoutingPath {
  DEFAULT = '',
  WEATHER = 'weather-forecast',
  FAVORITES = 'favorites',
}

export interface ItitleLayout {
  translationKey?: string;
  title?: string;
  url?: string;
  level?: number;
  order?: number;
}
