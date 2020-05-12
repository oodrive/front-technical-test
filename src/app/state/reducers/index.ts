import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}
