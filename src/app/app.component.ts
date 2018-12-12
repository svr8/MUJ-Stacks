import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigateService } from './services/navigate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  targetMap: {};

  constructor(private router: Router, private homeNavigator: NavigateService, private route: ActivatedRoute) {

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
    const url = this.router.url;

    let prefix = '/problems/:';
    if(url.indexOf(prefix) == 0) {
      const id = url.substring( url.indexOf(':')+1 );
      this.homeNavigator.viewQuestion(id);
    }
    else {
      const suffix = url.substring( 1 );
      this.homeNavigator.switchTarget(suffix);
    }

  }
}
