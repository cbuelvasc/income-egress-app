import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {IncomeEgress} from '../../models/income-egress.model';
import {Subscription} from 'rxjs';
import {IncomeEgressService} from '../../services/income-egress.service';
import Swal from 'sweetalert2';
import {AppStateIncomeEgress} from '../income-egress.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  incomesEgress: IncomeEgress[] = [];
  incomeEgressSubscription: Subscription;

  constructor(private incomeEgressService: IncomeEgressService, private store: Store<AppStateIncomeEgress>) {
  }

  ngOnInit(): void {
    this.incomeEgressSubscription = this.store.select('incomeEgress')
      .subscribe(({items}) => this.incomesEgress = items);
  }

  ngOnDestroy(): void {
    this.incomeEgressSubscription.unsubscribe();
  }

  delete(uid: string) {
    this.incomeEgressService.deleteIncomeEgress(uid)
      .then(() => Swal.fire('Deleted', 'Item deleted', 'success'))
      .catch(error => Swal.fire('Error', error.message, 'error'));
  }
}
