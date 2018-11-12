import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Button } from './button';
import { SignInService } from 'src/app/services/sign-in.service';

const teacher_buttonList: Button[] = [
  new Button('QUIZZES', 'content-teacher-quizzes'),
  new Button('QUESTIONS', 'content-teacher-questions'),
  new Button('ACCOUNT', 'content-teacher-account')
];

const studentbuttonnList: Button[] = [
    new Button('QUIZZES', 'content-student-quizzes'),
    new Button('QUESTIONS', 'content-student-questions'),
    new Button('ACCOUNT', 'content-student-account')
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  @Input() sidebar_type: string;
  
  selectedButton: Button;
  buttonList: Button[];
  @Output() selectTargetEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private user: SignInService) { 
  }

  ngOnChanges() {
  }

  selectButton(button: Button) {
    if(this.selectedButton)
      this.selectedButton.deselect();

    this.selectedButton = button;
    this.selectedButton.select();
    this.selectTargetEvent.emit(this.selectedButton.target);
  }

  signOut() {
    this.user.signOut();
  }
  

  ngOnInit() {
    if(this.sidebar_type == 'Teacher') 
      this.buttonList = teacher_buttonList;
    
    else if(this.sidebar_type == 'Student') 
      this.buttonList = studentbuttonnList;
  }

}
