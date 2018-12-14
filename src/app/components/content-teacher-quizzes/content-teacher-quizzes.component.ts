import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-content-teacher-quizzes',
  templateUrl: './content-teacher-quizzes.component.html',
  styleUrls: ['./content-teacher-quizzes.component.css']
})
export class ContentTeacherQuizzesComponent implements OnInit {

  constructor(public navigator: NavigateService) { }

  ngOnInit() {
  }

}
