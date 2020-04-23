import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LogginComponent} from './auth/loggin/loggin.component';
import {RegisterComponent} from './auth/register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {IncomeEgressComponent} from './income-egress/income-egress.component';
import {StatisticsComponent} from './income-egress/statistics/statistics.component';
import {DetailComponent} from './income-egress/detail/detail.component';
import {FooterComponent} from './shared/footer/footer.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomeEgressComponent,
    StatisticsComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
