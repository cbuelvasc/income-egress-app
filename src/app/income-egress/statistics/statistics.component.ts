import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {IncomeEgress} from '../../models/income-egress.model';
import {MultiDataSet, Label} from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit, OnDestroy {

  income = 0;
  egress = 0;
  totalIncome = 0;
  totalEgress = 0;

  incomeEgressSubscription: Subscription;

  public doughnutChartLabels: Label[] = ['Incomes', 'Egress'];
  public doughnutChartData: MultiDataSet = [
    []
  ];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.incomeEgressSubscription = this.store.select('incomeEgress')
      .subscribe(({items}) => this.generateStatistics(items));
  }

  ngOnDestroy(): void {
    this.incomeEgressSubscription.unsubscribe();
  }

  generateStatistics(items: IncomeEgress[]) {
    this.income = 0;
    this.egress = 0;
    this.totalIncome = 0;
    this.totalEgress = 0;
    for (const item of items) {
      if (item.typeValue === 'income') {
        this.totalIncome += item.amount;
        this.income++;
      } else {
        this.totalEgress += item.amount;
        this.egress++;
      }
    }
    this.doughnutChartData = [[this.totalIncome, this.totalEgress]];
  }

}
