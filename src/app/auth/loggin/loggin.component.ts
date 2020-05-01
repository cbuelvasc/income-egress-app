import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styles: []
})
export class LogginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.uiSubscription = this.store.select('ui')
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    const {email, password} = this.loginForm.value;
    this.authService.loginUser(email, password)
      .then(credentials => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      });
  }
}
