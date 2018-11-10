import { Component, OnInit, Input } from '@angular/core';
import { Button } from './button';
import { SignInService } from 'src/app/services/sign-in.service';

const teacher_buttonList: Button[] = [
  new Button('QUIZZES', 'DISPLAY QUIIZES'),
  new Button('QUESTIONS', 'DISPLAY QUESTIONS'),
  new Button('ACCOUNT', 'DISPLAY ACCOUNT')
];

const studentbuttonnList: Button[] = [
    new Button('QUIZZES', 'DISPLAY QUIIZES'),
    new Button('QUESTIONS', 'DISPLAY QUESTIONS'),
    new Button('ACCOUNT', 'DISPLAY ACCOUNT')
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

  constructor(private user: SignInService) { 
  }

  ngOnChanges() {
  }

  selectButton(button: Button) {
    if(this.selectedButton)
      this.selectedButton.deselect();

    this.selectedButton = button;
    this.selectedButton.select();
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
