import {Action, createReducer, on} from '@ngrx/store';
import * as favActions from '../actions/favorites.actions';
import {WeatherLocationFavorite} from '../../shared/models/favorities.models';

export const favoritesFeatureKey = 'favorites';

export interface State {
  favoritesArray: WeatherLocationFavorite[];
  selectedFavorite: WeatherLocationFavorite;
}

export const favInitialState: State = {
  favoritesArray: [],
  selectedFavorite: null
};

const favoritesReducer = createReducer(
  favInitialState,
  on(favActions.setSelectedFavorite,
    (state, {data}) => ({...state, selectedFavorite: data})),
  on(favActions.addToFavorites,
    (state, {data}) => ({...state, favoritesArray: [...state.favoritesArray, data]})
  ),
  on(favActions.setSelectedFavorite,
    (state, {data}) => ({...state, selectedFavorite: data}))
);

export function reducer(state = favInitialState, action: Action) {
  return favoritesReducer(state, action);
}

export const getFavoritesArray = (state: State) => state.favoritesArray;
export const getSelectedFavorite = (state: State) => state.selectedFavorite;
