import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  name = '';
  userSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(filter(({user}) => user != null))
      .subscribe(({user}) => this.name = user.name);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  signOut() {
    this.authService.signOut()
      .then(() => this.router.navigate(['/login']));
  }
}
