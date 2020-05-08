import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IncomeEgress} from '../models/income-egress.model';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class IncomeEgressService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
  }

  createIncomeEgress(incomeEgress: IncomeEgress) {
    const uid = this.authService.user.uid;
    delete incomeEgress.uid;
    return this.firestore.doc(`${uid}/income-egress`)
      .collection('items')
      .add({...incomeEgress});
  }

  initIncomesEgress(uid: string) {
    return this.firestore.collection(`${uid}/income-egress/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        ))
      );
  }

  deleteIncomeEgress(uidItem: string){
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/income-egress/items/${uidItem}`).delete();
  }
}
