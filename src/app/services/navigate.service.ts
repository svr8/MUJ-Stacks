import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  selectedTarget: string;

  constructor() { 
    this.selectedTarget = '';
  }

  switchTarget($event) {
    console.log('#' + $event);
    this.selectedTarget = $event;

    switch(this.selectedTarget) {
      case 'content-teacher-account': console.log('this.teacher_account_init();'); break;

      case 'content-teacher-questions': console.log('this.teacher_questions_init();'); break;
      case 'add-new-question': console.log('add-new-question'); break;
      
      case 'content-teacher-quizzes': console.log($event); break;
      default: console.log('INVALID SIDEMENU OPTION: ' + $event);
    }
  }
}
