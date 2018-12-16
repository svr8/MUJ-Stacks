import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  accountType: string;
  selectedTarget: string;
  selectedQID: string;
  selectedQuizID: string;
  editQuestionStatus: boolean;
  editQuizStatus: boolean;
  urlMap: {};

  constructor(private router: Router, private location: Location) { 
    this.selectedTarget = '';
    this.selectedQID = '';
    this.editQuestionStatus = false;
    this.editQuizStatus = false;
    this.urlMap = {
      'content-teacher-quizzes': 'quiz',
      'add-new-quiz': 'new-quiz',
      
      'content-teacher-questions': 'problems',
      'add-new-question': 'new-problem',
      
      'content-teacher-account': 'account',
    };
  }

  switchTarget($event) {
    if(!$event) return;
    this.selectedTarget = $event;
    this.location.go(this.urlMap[$event], '');
  }

  viewQuestion(qid: string) {
    console.log(`VIEW QUESION: ${qid}`);
    this.editQuestionStatus = false;
    this.selectedQID = qid;
    this.selectedTarget = 'content-question';
    this.location.go(`problems/:${qid}`, '');
  }

  viewQuizQuestion(quizId: string, qid: string) {
    console.log(`VIEW QUIZ QUESTION ${quizId}-->${qid}`);
    this.editQuestionStatus = false;
    this.selectedQID = qid;
    this.selectedTarget = 'content-question';
    this.location.go(`quiz/:${quizId}:${qid}`, '');
  }

  solveQuestion(qid: string) {
    this.editQuestionStatus = false;
    this.selectedQID = qid;
    this.selectedTarget = 'content-solution';
    this.location.go(`solution/:${qid}`, '');
  }
  switchToEditQuestion(qid: string) {
    console.log(`Editing ${qid}`);
    this.editQuestionStatus = true;
    this.selectedQID = qid;
    this.switchTarget('add-new-question');
  }

  viewQuiz(id: string) {
    this.editQuizStatus = false;
    this.selectedQuizID = id;
    this.selectedTarget = 'content-quiz';
    this.location.go(`quiz/:${id}`);
  }
  solveQuiz(id: string) {
    this.editQuizStatus = false;
    this.selectedQuizID = id;
  }
  switchToEditQuiz(id: string) {
    console.log(`Editing QUIZ ${id}`);
    this.editQuizStatus = true;
    this.selectedQuizID = id;
    this.switchTarget('add-new-quiz');
  }


}
