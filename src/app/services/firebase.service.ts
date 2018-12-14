import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AccountBrief } from '../components/main-content/teacher/account';
import { Question } from '../components/main-content/question';
import { NavigateService } from './navigate.service';
import { Quiz } from '../components/main-content/quiz';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // private userRef: Observable<any[]>

  constructor(public db: AngularFireDatabase, private homeNavigator: NavigateService) {}

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

  async getQuiz(id, callback) {
    let quiz = await this.db.object(`quiz/${id}`);
    
    quiz.valueChanges().subscribe(item => {
      callback(item);
    });
  }

  async deleteQuiz(id) {
    const quizRef = await this.db.list('/quiz');
    await quizRef.set(id, null);
  }
  removeQuizID(qid: string) {
    let uid = localStorage.getItem('uid');
   this.db.object(`users/${uid}/quizID/${qid}`).remove();
  }

  async getQuizIDList(callback) {
    let uid = localStorage.getItem('uid');
    let quizIDRef = await this.db.object(`users/${uid}/quizID`);
    let _this = this;
    quizIDRef.valueChanges().subscribe(item => {
      callback(item);
    });
  }

  uploadQuiz(quiz: Quiz, callback) {

    // Upload Quiz
    let quizRef = this.db.list('/quiz');
    quizRef.set(quiz.id, quiz);
    
    let _this = this;
    let flag = true;

    // Update Current User's QID List
    this.getQuizIDList(function(list) {
      if(!list) list = [];
      if(!flag) return;
      flag = false;
      // if(!_this.homeNavigator.editQuestionStatus) {
        let uid = localStorage.getItem('uid');
        let quizIDListRef = _this.db.list(`users/${uid}/quizID`);
        list[`${list.length}`] = quiz.id;
        quizIDListRef.set(`${list.length}`, quiz.id);
      // }
      callback();
    });
  }

  async getQuestion(qid, callback) {
    let question =  await this.db.object(`questions/${qid}`);
    
    question.valueChanges().subscribe(item => {
      callback(item);
    });
  }

  async deleteQuestion(qid) {
    const questionRef = await this.db.list('/questions');
    await questionRef.set(qid, null);
  }

  removeQuestionID(qid: string) {
    let uid = localStorage.getItem('uid');
   this.db.object(`users/${uid}/qid/${qid}`).remove();
  }

  async getQuestionIDList(callback) {
    let uid = localStorage.getItem('uid');
    let qidRef = await this.db.object(`users/${uid}/qid`);
    let _this = this;
    qidRef.valueChanges().subscribe(item => {
      callback(item);
    });
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
      if(!_this.homeNavigator.editQuestionStatus) {
        let uid = localStorage.getItem('uid');
        let qidListRef = _this.db.list(`users/${uid}/qid`);
        list[`${list.length}`] = question.qid;
        qidListRef.set(`${list.length}`, question.qid);
      }
      callback();
    });
  }

}
