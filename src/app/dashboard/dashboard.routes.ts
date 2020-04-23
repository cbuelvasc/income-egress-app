import {Routes} from '@angular/router';
import {StatisticsComponent} from '../income-egress/statistics/statistics.component';
import {IncomeEgressComponent} from '../income-egress/income-egress.component';
import {DetailComponent} from '../income-egress/detail/detail.component';

export const dashboardRoutes: Routes = [
  {path: '', component: StatisticsComponent},
  {path: 'income-egress', component: IncomeEgressComponent},
  {path: 'detail', component: DetailComponent}
];
