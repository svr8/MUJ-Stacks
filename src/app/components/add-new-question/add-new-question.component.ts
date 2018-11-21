import { Component, OnInit } from '@angular/core';
import { Question } from '../main-content/question';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NotificationBarComponent } from '../notification-bar/notification-bar.component';
import { Router } from '@angular/router';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {

  question: Question;

  constructor(private firebase: FirebaseService, private notifyController: NotificationBarComponent,
              private router: Router, private homeNavigator: NavigateService) {
    this.question = new Question('ID', '', '');
   }

  ngOnInit() {
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  checkQuestionID(callback) {
    let _this = this;
    this.firebase.getQuestion(this.question.qid, function(res){
        callback(!res);        
    });
  }

  uploadQuestion() {

    let _this = this;
    let flag = true;
    this.checkQuestionID(function(isValid) {
      if(!flag) return;

      if(isValid) {
        flag = false;
        _this.notifyController.showNotification('Uploading Question');
        _this.firebase.uploadQuestion(_this.question, function() {
          _this.notifyController.showNotification('Question uploaded successfully.');
          _this.homeNavigator.switchTarget('content-teacher-questions');
        });
      }
      else {
        _this.notifyController.showNotification('Quesion ID has already been used. Please enter new ID.');
      }
    });
  }

}
