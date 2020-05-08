import {createAction, props} from '@ngrx/store';
import {IncomeEgress} from '../models/income-egress.model';

export const setItems = createAction('[Income Egress] setItems', props<{ items: IncomeEgress[] }>());
export const unSetItems = createAction('[Income Egress] unSetItems');
