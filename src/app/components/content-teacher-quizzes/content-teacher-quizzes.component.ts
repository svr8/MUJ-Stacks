import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { Quiz } from '../main-content/quiz';
import { FirebaseService } from 'src/app/services/firebase.service';

const emptyQuizList_Message = new Quiz('-', 'You have not added any quizzes yet.', '-', '');
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
@Component({
  selector: 'app-content-teacher-quizzes',
  templateUrl: './content-teacher-quizzes.component.html',
  styleUrls: ['./content-teacher-quizzes.component.css']
})
export class ContentTeacherQuizzesComponent implements OnInit {

  quizList: Quiz[];


  constructor(public navigator: NavigateService, firebase: FirebaseService) {

    let _this = this;
    this.quizList = [];
    console.log('LOADING QUIZZES');

    firebase.getQuizIDList(function(idList) {
      if(!idList) {
        if(_this.quizList.length == 0)
          _this.quizList.push(emptyQuizList_Message);
        
        return;
      }

      for(let id in idList) {

        firebase.getQuiz(idList[id], function(res) {
          if(res == null) {
            firebase.removeQuizID(id);

            if(_this.quizList.length == 0)
              _this.quizList.push(emptyQuizList_Message);
            return;
          }

          let quiz = new Quiz(idList[id], res['title'], res['startDate'], res['endDate']);
          _this.quizList.push(quiz);
        });

      }

    });
  }

  ngOnInit() {
  }

}
