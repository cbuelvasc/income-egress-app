import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerFrom: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.registerFrom = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui')
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if (this.registerFrom.invalid) {
      return;
    }
    /*Swal.fire({
      title: 'Loading!',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });*/
    this.store.dispatch(ui.isLoading());

    const {name, email, password} = this.registerFrom.value;
    this.authService.createUser(name, email, password)
      .then(credentials => {
        // Swal.close();
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
