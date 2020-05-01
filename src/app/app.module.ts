import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {auth} from 'firebase/app';

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
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
