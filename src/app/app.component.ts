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

  constructor(private router: Router, private homeNavigator: NavigateService) {

    this.targetMap = {
      '': 'content-teacher-quizzes',
      'quiz': 'content-teacher-quizzes',
      'problems': 'content-teacher-questions',
      'new-problem': 'add-new-question',
      'account': 'content-teacher-account',
      'solution': 'content-solution'
    };

   }

  ngOnInit() {
  }

  onRouteChange() {
    const url = this.router.url;
    const prefix_problem = '/problems/:',
          prefix_solution = '/solution/:';


    if(this.hasURLPrefix(prefix_problem)) {
      const id = url.substring( url.indexOf(':')+1 );
      this.homeNavigator.viewQuestion(id);
    } else if(this.hasURLPrefix(prefix_solution)) {
      const id = url.substring( url.indexOf(':')+1 );
      this.homeNavigator.solveQuestion(id);
    }
    else {
      const suffix = url.substring( 1 );
      this.homeNavigator.switchTarget( this.targetMap[suffix] );
    }

  }

  hasURLPrefix(prefix: string): boolean {
    return this.router.url.indexOf(prefix) == 0;
  }
}
