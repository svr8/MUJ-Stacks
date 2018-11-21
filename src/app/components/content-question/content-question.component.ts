import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Question } from '../main-content/question';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-content-question',
  templateUrl: './content-question.component.html',
  styleUrls: ['./content-question.component.css']
})
export class ContentQuestionComponent implements OnInit {

  question: Question;

  constructor(private firebase: FirebaseService, private homeNavigator: NavigateService) { 
    this.question = new Question('', '', '');
    let _this = this;
    firebase.getQuestion(homeNavigator.selectedQID, function(res){
      console.log(res);
      _this.question.setDetails(res);
    });

  }

  ngOnInit() {
    console.log('VIEW QUESTION');
  }

}
