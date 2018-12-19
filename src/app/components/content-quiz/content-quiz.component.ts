import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { Quiz } from '../main-content/quiz';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content-quiz',
  templateUrl: './content-quiz.component.html',
  styleUrls: ['./content-quiz.component.css']
})
export class ContentQuizComponent implements OnInit {

  account_type: string;
  quiz: Quiz;
  showQuestionStatus: boolean;

  constructor(private router: Router, private firebase: FirebaseService, private homeNavigator: NavigateService) { 
    this.quiz = new Quiz('', '', null, null);
    let _this = this;
    firebase.getQuiz(homeNavigator.selectedQuizID, function(res){
      console.log(res);
      if(res)
        _this.quiz.setDetails(res);
      else
        homeNavigator.switchTarget('content-teacher-quizzes');
      

      let curDate = new Date();
      let startDate = new Date(_this.quiz.startDate);
      _this.showQuestionStatus = (curDate>=startDate) ;
      console.log(_this.showQuestionStatus);
    });

    this.account_type = homeNavigator.accountType;
    if(!this.account_type) {
      this.firebase.getAccountType(function(res){
        _this.account_type = res;
        homeNavigator.accountType = res;
      });
    }
  }

  ngOnInit() {
  }

  editQuiz() {
    this.homeNavigator.switchToEditQuiz(this.quiz.id);
  }

  deleteQuiz() {
    this.firebase.deleteQuiz(this.quiz.id);
    this.homeNavigator.switchTarget('content-teacher-quizzes');
  }

  viewQuestion(qid: string) {
    window.open(`quiz/:${this.quiz.id}/:${qid}`, '_blank');        
  }

}
