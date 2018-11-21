import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from '../main-content/question';
import { NavigateService } from 'src/app/services/navigate.service';
import { FirebaseService } from 'src/app/services/firebase.service';

const emptyQuestionList_Message = new Question('-', 'You have not added any questions yet.', '-');

@Component({
  selector: 'app-content-teacher-questions',
  templateUrl: './content-teacher-questions.component.html',
  styleUrls: ['./content-teacher-questions.component.css']
})
export class ContentTeacherQuestionsComponent implements OnInit {

  questionList: Question[];

  @Output() selectTargetEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(public navigateService: NavigateService, firebase: FirebaseService) {
    let _this = this;
    this.questionList = [];

    // Load questionIDList of current user(teacher)
    firebase.getQuestionIDList(function(idList) {
      // console.log(idList);
      if(!idList) {
        if(_this.questionList.length == 0)
          _this.questionList.push(emptyQuestionList_Message);
        return;
      }
      
      for(let id in idList) {

        // Load question with id: res[id]
        firebase.getQuestion(idList[id], function(res) {
          if(res == null) {

            // Remove ID from database list of this user
            firebase.removeQuestionID(id);

            if(_this.questionList.length == 0)
            _this.questionList.push(emptyQuestionList_Message);
            return;
          }
          // Upadte current questions list
          let question = new Question(idList[id], res['title'], res['lang']);
          _this.questionList.push(question);

        });

      }

    });
  }

  ngOnInit() {
  }
}
