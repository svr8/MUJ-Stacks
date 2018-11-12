import { Component, OnInit, ViewChild } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TeacherAccount } from '../main-content/teacher/account';
import { Question } from '../main-content/question';

const emptyQuestionList_Message = new Question('-', 'You have not added any questions yet.', '-');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // CONTENT-TEACHER-ACCOUNT
  account_type: string;
  selectedTarget: string;
  teacher: TeacherAccount;

  // CONTENT-TEACHER-QUESTIONS
  questionList: Question[];

  constructor(private firebase: FirebaseService, private user: SignInService) {}

  ngOnInit() {

    let _this = this;
    let uid = localStorage.getItem('uid');

    if(uid=='undefined' || uid=='null') {
       return;
    }

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
        _this.questionList.push(emptyQuestionList_Message);
        return;
      }
      
      for(let id in idList) {

        // Load question with id: res[id]
        _this.firebase.getQuestion(idList[id], function(res) {
          if(res == null) return;
          // Upadte current questions list
          let question = new Question(idList[id], res['title'], res['lang']);
          _this.questionList.push(question);

        });

      }

    });
  }

}
