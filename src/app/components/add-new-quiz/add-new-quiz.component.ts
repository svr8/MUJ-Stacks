import { Component, OnInit } from '@angular/core';
import { Question } from '../main-content/question';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NotificationBarComponent } from '../notification-bar/notification-bar.component';
import { Router } from '@angular/router';
import { NavigateService } from 'src/app/services/navigate.service';
import { Quiz } from '../main-content/quiz';

@Component({
  selector: 'app-add-new-quiz',
  templateUrl: './add-new-quiz.component.html',
  styleUrls: ['./add-new-quiz.component.css']
})
export class AddNewQuizComponent implements OnInit {

  quiz: Quiz;

  constructor(private firebase: FirebaseService, private notifyController: NotificationBarComponent,
              private router: Router, private homeNavigator: NavigateService) {
    
    if(homeNavigator.accountType != 'Teacher')
        homeNavigator.switchTarget('content-teacher-quizzes');
    this.quiz = new Quiz('', '', '');
   }

  ngOnInit() {
    if(this.homeNavigator.editQuizStatus) {
      this.autoFillData(this.homeNavigator.selectedQuizID);
    }
  }

  autoFillData(id: string) {
    console.log(`Loading ${id}`);
    let _this = this;
    this.firebase.getQuiz(id, function(quiz) {
      _this.quiz = quiz;
    }); 
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  checkQuizID(callback) {
    this.firebase.getQuiz(this.quiz.id, function(res){
        callback(!res);        
    });
  }

  uploadQuiz() {

    let _this = this;
    let flag = true; // workaround: question was being uploaded more than once
    this.checkQuizID(function(isValid) {
      if(!flag) return;

      if(isValid) {
        flag = false;
        _this.notifyController.showNotification('Uploading Quiz');
        _this.firebase.uploadQuiz(_this.quiz, function() {
          _this.notifyController.showNotification('Quiz uploaded successfully.');
          // _this.homeNavigator.viewQuiz(_this.quiz.id);
        });
      }
      else {
        _this.notifyController.showNotification('Quiz ID has already been used. Please enter new ID.');
        _this.homeNavigator.viewQuestion(this.quiz.qid);
      }
    });
  }

}
