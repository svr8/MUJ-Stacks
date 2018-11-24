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
  urlMap: {};

  constructor(private router: Router, private location: Location) { 
    this.selectedTarget = '';
    this.selectedQID = '';
    this.urlMap = {
      'content-teacher-quizzes': 'quiz',
      'content-teacher-questions': 'problems',
      'add-new-question': 'new-problem',
      'content-teacher-account': 'account'
    };
  }

  switchTarget($event) {
    console.log('#' + $event);
    this.selectedTarget = $event;

    this.location.replaceState(this.urlMap[$event], '');
  }

  viewQuestion(qid: string) {
    this.selectedQID = qid;
    this.switchTarget('content-question');
  }
}
