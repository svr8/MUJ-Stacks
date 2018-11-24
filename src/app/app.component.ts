import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigateService } from './services/navigate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  targetMap: {};

  constructor(private router: Router, private homeNavigator: NavigateService) {

    this.targetMap = {
      '': 'content-teacher-quizzes',
      'quiz': 'content-teacher-quizzes',
      'problems': 'content-teacher-questions',
      'new-problem': 'add-new-question',
      'account': 'content-teacher-account'
    };

   }

  ngOnInit() {
  }

  onRouteChange() {
    let url = this.router.url;
    let index = url.lastIndexOf('/');
    let suffix = url.substring(index+1);
    if(!suffix) suffix='';
    this.homeNavigator.switchTarget( this.targetMap[suffix] );
    
  }
}
