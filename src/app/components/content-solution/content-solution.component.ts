import { Component, OnInit } from '@angular/core';
//import { AceEditorModule } from 'ng2-ace-editor';
import 'brace/mode/java';
import 'brace/ext/language_tools';
import 'brace/snippets/text';
import 'brace/snippets/java';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-content-solution',
  templateUrl: './content-solution.component.html',
  styleUrls: ['./content-solution.component.css']
})
export class ContentSolutionComponent implements OnInit {
  
  text: string = "";

  constructor(private navigator: NavigateService) {
  }

  ngOnInit() {
    console.log('Solving: ' + this.navigator.selectedQID);
  }

  // onChange($event) {
  //   console.log($event);
  // }

}
