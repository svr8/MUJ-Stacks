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

  account_type: string;
  question: Question;

  constructor(private firebase: FirebaseService, private homeNavigator: NavigateService) { 
    this.question = new Question('', '', '');
    let _this = this;
    firebase.getQuestion(homeNavigator.selectedQID, function(res){
      console.log(res);
      if(res)
        _this.question.setDetails(res);
      else
        homeNavigator.switchTarget('content-teacher-questions');
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

  editQuestion() {
    this.homeNavigator.switchToEditQuestion(this.question.qid);
  }
  deleteQuestion() {
    this.firebase.deleteQuestion(this.question.qid);
    this.homeNavigator.switchTarget('content-teacher-questions');
  }
  solveQuestion() {
    console.log(`Solve Question: ${this.question.qid}`)
    // this.homeNavigator.solveQuestion(this.question.qid);
    window.open(`http://localhost:4200/solution/:${this.question.qid}`, '_blank');    
  }

}
