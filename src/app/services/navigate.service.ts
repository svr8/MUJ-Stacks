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
  editQuestionStatus: boolean;
  urlMap: {};

  constructor(private router: Router, private location: Location) { 
    this.selectedTarget = '';
    this.selectedQID = '';
    this.editQuestionStatus = false;
    this.urlMap = {
      'content-teacher-quizzes': 'quiz',
      'content-teacher-questions': 'problems',
      'add-new-question': 'new-problem',
      'content-teacher-account': 'account',
      'content-question': 'problems'
    };
  }

  switchTarget($event) {
    if(!$event) return;
    this.selectedTarget = $event;
    this.location.replaceState(this.urlMap[$event], '');
  }

  viewQuestion(qid: string) {
    this.editQuestionStatus = false;
    this.selectedQID = qid;
    this.switchTarget('content-question');
    this.location.replaceState(`problems/:${qid}`, '');
  }

  switchToEditQuestion(qid: string) {
    console.log(`Editing ${qid}`);
    this.editQuestionStatus = true;
    this.selectedQID = qid;
    this.selectedTarget = 'add-new-question';
    this.location.replaceState(this.urlMap['add-new-question'], '');
  }
}
