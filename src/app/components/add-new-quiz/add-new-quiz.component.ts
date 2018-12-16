import { Component, OnInit } from '@angular/core';
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
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;

  constructor(private firebase: FirebaseService, private notifyController: NotificationBarComponent,
              private homeNavigator: NavigateService) {
    
    if(homeNavigator.accountType != 'Teacher')
        homeNavigator.switchTarget('content-teacher-quizzes');
    this.quiz = new Quiz('', '', null, null);
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

  extractDateTime(date: string, time: string): Date {
    var x = new Date(date);

    time = this.formatTime(time);
    x.setHours( this.extractHours(time) );
    x.setMinutes( this.extractMinutes(time) );
    x.setSeconds( this.extractSeconds(time) );

    return x;   
  }

  formatTime(time: string) {
    let index1 = time.indexOf(":");
    let index2 = time.indexOf(":", index1+1);
    if(index2 == -1) time = time + ":00";
    return time;
  }
  extractHours(time: string):number {
    let index = time.indexOf(':');
    return parseInt(time.substring(0, index));
  }
  extractMinutes(time: string): number {
    let index1 = time.indexOf(":");
    let index2 = time.indexOf(":", index1+1);
    return parseInt( time.substring(index1+1, index2) );
  }
  extractSeconds(time: string): number {
    let index1 = time.indexOf(":");
    let index2 = time.indexOf(":", index1+1);
    return parseInt(time.substring(index2+1));
  }

  uploadQuiz() {

    let start = this.extractDateTime(this.startDate, this.startTime);
    let end = this.extractDateTime(this.endDate, this.endTime);

    this.quiz.startDate = start.toString();
    this.quiz.endDate = end.toString();
    
    console.log(this.quiz.startDate);
    console.log(this.quiz.endDate);

    let _this = this;
    let flag = true; // workaround: question was being uploaded more than once
    this.checkQuizID(function(isValid) {
      if(!flag) return;

        if(isValid || _this.homeNavigator.editQuizStatus) {
          flag = false;
          _this.notifyController.showNotification('Uploading Quiz');
          _this.firebase.uploadQuiz(_this.quiz, function() {
            _this.notifyController.showNotification('Quiz uploaded successfully.');
            _this.homeNavigator.viewQuiz(_this.quiz.id);
            _this.homeNavigator.editQuestionStatus = false;
        });
      }
      else {
        _this.notifyController.showNotification('Quiz ID has already been used. Please enter new ID.');
        _this.homeNavigator.viewQuestion(this.quiz.qid);
      }
    });
  }

}
