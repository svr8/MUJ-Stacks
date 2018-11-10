import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // private userRef: Observable<any[]>

  constructor(public db: AngularFireDatabase) { 
    
  }

  async createUser(uid: string, data: any) {
    const users = await this.db.list('/users');
    await users.set(uid, data);
  }

  getAccountType(callback) {
    let uid = localStorage.getItem('uid');
    let account_type;
    let itemList = this.db.object(`/users/${uid}`);
    itemList.valueChanges().subscribe(item => {
      account_type = item['account_type'];
      callback(account_type);
    });
  }

  

}
