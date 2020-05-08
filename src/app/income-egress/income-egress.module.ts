import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {IncomeEgressComponent} from './income-egress.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {DetailComponent} from './detail/detail.component';
import {OrderIncomesEgressPipe} from '../pipes/order-incomes-egress.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';
import {StoreModule} from '@ngrx/store';
import {incomeEgressReducer} from './income-egress.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    IncomeEgressComponent,
    StatisticsComponent,
    DetailComponent,
    OrderIncomesEgressPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeEgress', incomeEgressReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class IncomeEgressModule {
}
