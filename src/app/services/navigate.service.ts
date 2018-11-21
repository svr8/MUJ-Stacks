import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  selectedTarget: string;
  selectedQID: string;

  constructor() { 
    this.selectedTarget = '';
    this.selectedQID = '';
  }

  switchTarget($event) {
    console.log('#' + $event);
    this.selectedTarget = $event;
  }

  viewQuestion(qid: string) {
    this.selectedQID = qid;
    this.switchTarget('content-question');
  }
}
