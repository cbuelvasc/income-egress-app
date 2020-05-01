import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState>) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/user`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = User.fromFirebase(firestoreUser);
            this.store.dispatch(authActions.setUser({user}));
          });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }

    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser = new User(user.uid, name, user.email);
        return this.firestore.doc(`${user.uid}/user`)
          .set({...newUser});
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState
      .pipe(map(firebaseUser => firebaseUser != null));
  }
}
