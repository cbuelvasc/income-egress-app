import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomeEgress} from '../models/income-egress.model';
import {IncomeEgressService} from '../services/income-egress.service';
import Swal from 'sweetalert2';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-income-egress',
  templateUrl: './income-egress.component.html',
  styles: []
})
export class IncomeEgressComponent implements OnInit, OnDestroy {

  incomeEgressForm: FormGroup;
  typeValue = 'income';
  loading = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private incomeEgressService: IncomeEgressService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.incomeEgressForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.uiSubscription = this.store.select('ui')
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  save() {
    if (this.incomeEgressForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    const {description, amount} = this.incomeEgressForm.value;
    this.incomeEgressService.createIncomeEgress(new IncomeEgress(description, amount, this.typeValue))
      .then(() => {
        this.incomeEgressForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Item created', description, 'success');
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', error.message, 'error');
      });
  }
}
