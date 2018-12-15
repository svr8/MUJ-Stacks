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

  constructor(private router: Router, private firebase: FirebaseService, private homeNavigator: NavigateService) { 
    this.quiz = new Quiz('', '', '');
    let _this = this;
    firebase.getQuiz(homeNavigator.selectedQuizID, function(res){
      console.log(res);
      if(res)
        _this.quiz.setDetails(res);
      else
        homeNavigator.switchTarget('content-teacher-quizzes');
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

  startQuiz() {
    console.log(`Start Quiz: ${this.quiz.id}`)
    // window.open(`http://localhost:4200/solution/:${this.quiz.id}`, '_blank');    
  }

}
