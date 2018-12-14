import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { Quiz } from '../main-content/quiz';


@Component({
  selector: 'app-content-quiz',
  templateUrl: './content-quiz.component.html',
  styleUrls: ['./content-quiz.component.css']
})
export class ContentQuizComponent implements OnInit {

  account_type: string;
  quiz: Quiz;

  constructor(private firebase: FirebaseService, private homeNavigator: NavigateService) { 
    this.quiz = new Quiz('', '', '');
    let _this = this;


    // firebase.getQuiz(homeNavigator.selectedQuizID, function())
  }

  ngOnInit() {
  }

  editQuiz() {

  }

  deleteQuiz() {

  }

  startQuiz() {

  }

}
