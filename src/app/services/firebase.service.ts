import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AccountBrief } from '../components/main-content/teacher/account';
import { Question } from '../components/main-content/question';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // private userRef: Observable<any[]>

  constructor(public db: AngularFireDatabase) {}

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

  getAccountBreif(callback) {
    let uid = localStorage.getItem('uid');
    
    let accountDetails = this.db.object(`/users/${uid}`);
    accountDetails.valueChanges().subscribe(item => {
      let ob = item;
      ob['email'] = localStorage.getItem('email');
      
      let teacher = new AccountBrief(
        item['name'],
        item['email'],
        item['account_type']
      );
      callback(teacher);

    });
  }

  async getQuestion(qid, callback) {
    let question =  await this.db.object(`questions/${qid}`);
    
    question.valueChanges().subscribe(item => {
      callback(item);
    });
  }

  async getQuestionIDList(callback) {
    let uid = localStorage.getItem('uid');
    let qidRef = await this.db.object(`users/${uid}/qid`);
    let _this = this;
    qidRef.valueChanges().subscribe(item => {
      callback(item);
    });
  }

  removeQuestionID(qid: string) {
    let uid = localStorage.getItem('uid');
   this.db.object(`users/${uid}/qid/${qid}`).remove();
  }
 

  uploadQuestion(question: Question, callback) {

    // Upload Question
    let questionRef = this.db.list('/questions');
    questionRef.set(question.qid, question);
    
    let _this = this;
    let flag = true;

    // Update Current User's QID List
    this.getQuestionIDList(function(list) {
      if(!list) list = [];
      if(!flag) return;
      flag = false;
      let uid = localStorage.getItem('uid');
      let qidListRef = _this.db.list(`users/${uid}/qid`);
      list[`${list.length}`] = question.qid;
      qidListRef.set(`${list.length}`, question.qid);
      callback();
    });
  }

}
