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
      'new-quiz': 'add-new-quiz',
      'account': 'content-teacher-account',
      'solution': 'content-solution',
    };

   }

  ngOnInit() {
  }

  onRouteChange() {
    const url = this.router.url;
    const prefix_problem = '/problems/:',
          prefix_solution = '/solution/:',
          prefix_quiz = '/quiz/:';

    if(this.hasURLPrefix(prefix_problem)) 
      this.homeNavigator.viewQuestion(this.getIDfromURL(url));
    
    else if(this.hasURLPrefix(prefix_solution)) 
      this.homeNavigator.solveQuestion(this.getIDfromURL(url));
     
    else if(this.hasURLPrefix(prefix_quiz)) 
       this.homeNavigator.viewQuiz( this.getIDfromURL(url) );
    
    else {
      const suffix = url.substring( 1 );
      this.homeNavigator.switchTarget( this.targetMap[suffix] );
    }

  }

  getIDfromURL(url): string {
    return url.substring( url.indexOf(':')+1 );
  }

  hasURLPrefix(prefix: string): boolean {
    return this.router.url.indexOf(prefix) == 0;
  }
}
