import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {IncomeEgressService} from '../services/income-egress.service';
import * as incomesEgressActions from '../income-egress/income-egress.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  incomesEgressSubs: Subscription;

  constructor(private store: Store<AppState>, private incomeEgressService: IncomeEgressService) {
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(filter(auth => auth.user != null))
      .subscribe(({user}) => {
        this.incomesEgressSubs = this.incomeEgressService.initIncomesEgress(user.uid)
          .subscribe(incomesEgress => {
            this.store.dispatch(incomesEgressActions.setItems({items: incomesEgress}));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.incomesEgressSubs?.unsubscribe();
  }

}
