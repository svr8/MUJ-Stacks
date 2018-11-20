import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TeacherAccount } from '../main-content/teacher/account';
import { Question } from '../main-content/question';
import { TestCase } from '../main-content/test-case';

const emptyQuestionList_Message = new Question('-', 'You have not added any questions yet.', '-');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  // CONTENT-TEACHER-ACCOUNT
  account_type: string;
  selectedTarget: string;
  teacher: TeacherAccount;

  // CONTENT-TEACHER-QUESTIONS
  questionList: Question[];

  // ADD-NEW-QUESTION
  constraintList: string[] = [];
  testCaseList: TestCase[] = [];
  sampleCaseList: TestCase[] = [];

  constructor(private firebase: FirebaseService, private user: SignInService) {}

  ngOnInit() {

    let _this = this;
    let uid = localStorage.getItem('uid');

    if(!uid || uid=='undefined' || uid=='null')
       return;

    // CONTENT-TEACHER-ACCOUNT

    this.firebase.getAccountType(function(res){
     
      if(res == 'Teacher' || res == 'Student') {
        _this.account_type = res;
      }
      else {
        console.log('Undefined account_type');
        this.user.signOut();
      }

    });

    this.teacher = new TeacherAccount('', '', '');

  }

  switchTarget($event) {
    this.selectedTarget = $event;

    switch(this.selectedTarget) {
      case 'content-teacher-account': this.teacher_account_init(); break;

      case 'content-teacher-questions': this.teacher_questions_init(); break;
      case 'add-new-question': console.log('add-new-question'); break;
      
      case 'content-teacher-quizzes': console.log($event); break;
      default: console.log('INVALID SIDEMENU OPTION: ' + $event);
    }
  }

  teacher_account_init() {
    let _this = this;

    this.firebase.getTeacherAccount(function(teacher){
      _this.teacher = teacher;
    });
  }

  // ----------------------------------------------------------------------------

  // CONTENT-TEACHER-QUESTIONS

  teacher_questions_init() {
    console.log('questions_init');
    let _this = this;
    this.questionList = [];

    // Load questionIDList of current user(teacher)
    this.firebase.getQuestionIDList(function(idList) {
      if(idList.length == 0) {
        if(_this.questionList.length == 0)
          _this.questionList.push(emptyQuestionList_Message);
        return;
      }
      
      for(let id in idList) {

        // Load question with id: res[id]
        _this.firebase.getQuestion(idList[id], function(res) {
          if(res == null) {
            if(_this.questionList.length == 0)
            _this.questionList.push(emptyQuestionList_Message);
            return;
          }
          // Upadte current questions list
          let question = new Question(idList[id], res['title'], res['lang']);
          _this.questionList.push(question);

        });

      }

    });
  }

  // ----------------------------------------------------------------------------

  // ADD-NEW-QUESTION

  trackByFn(index: any, item: any) {
    return index;
 }

  addNewConstraint() {
    this.constraintList.push('');
  }
  deleteConstraint(constraint: string) {
    let index = this.constraintList.indexOf(constraint);
    if(index != -1)
      this.constraintList.splice(index, 1);
  }

  addSampleCase() {
    this.sampleCaseList.push( new TestCase('', '') );
  }
  deleteSampleCase(testcase) {
    let index = this.sampleCaseList.indexOf(testcase);
    if(index != -1)
      this.sampleCaseList.splice(index, 1);
  }

  addTestCase() {
    this.testCaseList.push( new TestCase('', '') );
  }
  deleteTestCase(testcase) {
    let index = this.testCaseList.indexOf(testcase);
    if(index != -1)
      this.testCaseList.splice(index, 1);
  }

  uploadQuestion() {
    console.log('SUBMIT QUESTION');

    for(let index=0;index<this.constraintList.length;index++)
      console.log(this.constraintList[index]);
    
    for(let index=0;index<this.sampleCaseList.length;index++) {
      console.log("i: "+this.sampleCaseList[index].input);
      console.log("o: "+this.sampleCaseList[index].output);
      console.log('');
    }

    for(let index=0;index<this.testCaseList.length;index++) {
      console.log("i: "+this.testCaseList[index].input);
      console.log("o: "+this.testCaseList[index].output);
      console.log('');
    }
  }

}
