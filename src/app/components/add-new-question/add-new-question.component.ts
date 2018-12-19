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
    
    if(homeNavigator.accountType != 'Teacher')
        homeNavigator.switchTarget('content-teacher-quizzes');
        this.question = new Question('', '', 'Select Language');
   }

  ngOnInit() {
    if(this.homeNavigator.editQuestionStatus) {
      this.autoFillData(this.homeNavigator.selectedQID);
    }
  }

  autoFillData(qid: string) {
    console.log(`Loading ${qid}`);
    let _this = this;
    this.firebase.getQuestion(qid, function(question) {
      // _this.question = question;
      _this.question.setDetails(question);
    }); 
  }


  trackByFn(index: any, item: any) {
    return index;
  }

  showLanguageOptions() {
    let el = document.getElementById('language-optionContainer');
    el.style.display = 'block';
  }
  hideLanguageOptions() {
    let el = document.getElementById('language-optionContainer');
    el.style.display = 'none';
  }

  selectLanguage(language: string) {
    this.question.language = language;
    this.hideLanguageOptions();
  }

  checkQuestionID(callback) {
    this.firebase.getQuestion(this.question.qid, function(res){
        callback(!res);        
    });
  }

  uploadQuestion() {

    let _this = this;
    let flag = true; // workaround: question was being uploaded more than once
    this.checkQuestionID(function(isValid) {
      if(!flag) return;

      if(isValid || _this.homeNavigator.editQuestionStatus) {
        flag = false;
        _this.notifyController.showNotification('Uploading Question');
        _this.firebase.uploadQuestion(_this.question, function() {
          _this.notifyController.showNotification('Question uploaded successfully.');
          _this.homeNavigator.viewQuestion(_this.question.qid);
          _this.homeNavigator.editQuestionStatus = false;
        });
      }
      else {
        _this.notifyController.showNotification('Quesion ID has already been used. Please enter new ID.');
        _this.homeNavigator.viewQuestion(this.question.qid);
      }
    });
  }

}
