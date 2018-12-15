import { Component, OnInit } from '@angular/core';
//import { AceEditorModule } from 'ng2-ace-editor';
import 'brace/mode/java';
import 'brace/ext/language_tools';
import 'brace/snippets/text';
import 'brace/snippets/java';
import 'brace/snippets/c_cpp';
import 'brace/snippets/python';

import { NavigateService } from 'src/app/services/navigate.service';
import { Question } from '../main-content/question';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

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


  constructor(private navigator: NavigateService,
              private firebase: FirebaseService,
              private router: Router) {
    const url = this.router.url;
    const qid = url.substring( url.indexOf(':')+1 );
    const _this = this;
    
    this.language = 'text';
    this.hasCustomInput = false;
    this.options = {enableBasicAutocompletion: true,enableSnippets: true,enableLiveAutocompletion: true,autoScrollEditorIntoView: true,showPrintMargin: false,fontSize: '20px'};

    firebase.getQuestion(qid, function(res) {
      _this.question = new Question(qid, res['title'], res['language']);
      _this.language = res['language'];
    });
  }

  ngOnInit() {
  }


  compile() {
    console.log(`Compiling ${this.question.qid}`);
    console.log(this.data);
  }

  run() {
    console.log(`Running ${this.question.qid}`);
    console.log(this.data);
    console.log(this.hasCustomInput);
    console.log(this.customInput);
  }

  // onChange($event) {
  //   console.log($event);
  // }

}
