import { Component, OnInit } from '@angular/core';
//import { AceEditorModule } from 'ng2-ace-editor';

import 'brace/ext/language_tools';

import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/java';
import 'brace/mode/python';

import 'brace/snippets/text';
import 'brace/snippets/java';
import 'brace/snippets/c_cpp';
import 'brace/snippets/python';

import { NavigateService } from 'src/app/services/navigate.service';
import { Question } from '../main-content/question';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { Quiz } from '../main-content/quiz';

const editorMode = {
  'Java': 'java',
  'C': 'c_cpp',
  'C++': 'c_cpp',
  'Python': 'python'
};

@Component({
  selector: 'app-content-solution',
  templateUrl: './content-solution.component.html',
  styleUrls: ['./content-solution.component.css']
})
export class ContentSolutionComponent implements OnInit {
  
  options: any;
  question: Question;
  data: string;
  language: string;
  hasCustomInput: boolean;
  customInput: string;
  isQuiz: boolean;
  quizID: string;

  constructor(private navigator: NavigateService,
              private firebase: FirebaseService,
              private router: Router) {
    const _this = this;
    
    this.language = 'text';
    this.hasCustomInput = false;
    this.options = {enableBasicAutocompletion: true,enableSnippets: true,enableLiveAutocompletion: true,autoScrollEditorIntoView: true,showPrintMargin: false,fontSize: '20px'};
    this.question = new Question('', '', '');
    
    this.getIDs();

    firebase.getQuestion(this.question.qid, function(res) {
      _this.question = new Question(_this.question.qid, res['title'], res['language']);
      _this.language = editorMode[ res['language'] ];
    });

  }


  getIDs() {
    const url = this.router.url;
    const index1 = url.indexOf(":"); // /problems/:PROBLEM_ID
    const index2 = url.indexOf(":", index1+1); // /quiz/:QUIZ_ID/:PROBLEM_ID
    if(index2 == -1) {
      this.isQuiz = false;
      this.question.qid = url.substring(index1+1);
    }
    else {
      this.quizID = url.substring(index1+1, index2);
      this.question.qid = url.substring(index2+1);
      
      // Check Time
      this.firebase.getQuiz(this.quizID, function(res) {

        let quiz = new Quiz('', '', '', '');
        quiz.setDetails(res);

        let curDate = new Date();
        let startDate = new Date(quiz.startDate);
        let endDate = new Date(quiz.endDate);
        this.isQuiz = (curDate>=startDate && curDate<=endDate) ;
      });
    }
  }

  ngOnInit() {
  }

  compile() {
    console.log(`Compiling ${this.question.qid}`);
    console.log(this.data);
  }

  run() {
    if(this.isQuiz) 
      console.log(`QUIZ: ${this.quizID}`);
    
    console.log(`Running ${this.question.qid}`);
    console.log(this.data);
    
    if(this.hasCustomInput)
      console.log('CUSTOM INPUT: ' + this.customInput);
    console.log('isQuizSubmition: ' + this.isQuiz);
  }

  // onChange($event) {
  //   console.log($event);
  // }

}
