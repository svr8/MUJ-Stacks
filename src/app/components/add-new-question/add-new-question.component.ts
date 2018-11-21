import { Component, OnInit } from '@angular/core';
import { Question } from '../main-content/question';
import { TestCase } from '../main-content/test-case';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {

  question: Question;

  constructor() {
    this.question = new Question('', '', '');
   }

  ngOnInit() {
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  uploadQuestion() {
    console.log('SUBMIT QUESTION');
  }

}
