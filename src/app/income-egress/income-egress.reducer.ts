import {createReducer, on} from '@ngrx/store';
import {setItems, unSetItems} from './income-egress.actions';
import {IncomeEgress} from '../models/income-egress.model';
import {AppState} from '../app.reducer';

export interface State {
  items: IncomeEgress[];
}

export interface AppStateIncomeEgress extends AppState{
  incomeEgress: State;
}

export const initialState: State = {
  items: []
}

// tslint:disable-next-line:variable-name
const _incomeEgress = createReducer(initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unSetItems, state => ({...state, items: []}))
);

export function incomeEgressReducer(state, action) {
  return _incomeEgress(state, action);
}
