import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-problem',
  templateUrl: './content-problem.component.html',
  styleUrls: ['./content-problem.component.css']
})
export class ContentProblemComponent implements OnInit {

  problemWidget: any;
  editorWidget: any;

  constructor() { 
  }

  showProblem() { 
    this.problemWidget.style.display = 'block';
    this.editorWidget.style.display = 'none';
   }
  showEditor() { 
    this.problemWidget.style.display = 'none';
    this.editorWidget.style.display = 'block';

    let el = document.getElementById('editorWrap');
    el.style.height = (window.innerHeight * 0.7) + 'px';

    el = document.getElementById('optionsContainer');
    el.style.height = (window.innerHeight * 0.045) + 'px';
    
    el = document.getElementById('labelContainer');
    el.style.height = (window.innerHeight * 0.025) + 'px';

    el = document.getElementById('ioContainer');
    el.style.height = (window.innerHeight * 0.235) + 'px';
   }

  ngOnInit() {
    this.problemWidget = document.getElementById('problemWidget');
    this.editorWidget = document.getElementById('editorWidget');

    this.showProblem();
  }

}
