import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // private userRef: Observable<any[]>

  constructor(public db: AngularFireDatabase) { 
    
  }

  async createUser(uid: string, data: any) {
    const ref = await this.db.list('/users');
    await ref.set(uid, data);
  }

}
