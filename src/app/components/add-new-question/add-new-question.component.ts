import { Component, OnInit } from '@angular/core';
import { Question } from '../main-content/question';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NotificationBarComponent } from '../notification-bar/notification-bar.component';
import { callbackify } from 'util';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {

  question: Question;

  constructor(private firebase: FirebaseService, private notifyController: NotificationBarComponent) {
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
    this.checkQuestionID(function(isValid) {
      if(isValid) {
        _this.notifyController.showNotification('Uploading Question');
        _this.firebase.updateQuestion(_this.question);
      }
      else {
        _this.notifyController.showNotification('Quesion ID has already been used. Please enter new ID.');
      }
    });
  }

}
