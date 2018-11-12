import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { callbackify } from 'util';
import { TeacherAccount } from '../components/main-content/teacher/account';

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
    let accountDetails = this.db.object(`/users/${uid}`);
    accountDetails.valueChanges().subscribe(item => {
      account_type = item['account_type'];
      callback(account_type);
    });
  }

  getTeacherAccount(callback) {
    let uid = localStorage.getItem('uid');
    
    let accountDetails = this.db.object(`/users/${uid}`);
    accountDetails.valueChanges().subscribe(item => {
      let ob = item;
      ob['email'] = localStorage.getItem('email');
      
      let teacher = new TeacherAccount(
        item['name'],
        item['email'],
        item['account_type']
      );
      callback(teacher);

    });
  }

  getQuestion(qid, callback) {
    let question =  this.db.object(`questions/${qid}`);
    
    question.valueChanges().subscribe(item => {
      callback(item);
    });
  }

  getQuestionIDList(callback) {
    let uid = localStorage.getItem('uid');
    
    let qidRef = this.db.object(`users/${uid}/qid`);
    qidRef.valueChanges().subscribe(item => {
      let idList = [];
      for(let id in item) idList.push(item[id]);
      callback(idList);
    });
  }

  

}
