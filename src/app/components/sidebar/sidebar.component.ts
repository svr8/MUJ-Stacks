import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Button } from './button';
import { SignInService } from 'src/app/services/sign-in.service';
import anime from 'animejs';

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

const sidebar_fade_duration = 100;

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

  sidemenu_viewStatus: boolean;

  constructor(private user: SignInService) { 
    if(window.innerWidth >= 800)
      this.showSidemenu();
    else
      this.hideSidemenu();
  }

  ngOnChanges() {
  }

  onResize(event) {
    console.log('resize');
    if(window.innerWidth >= 800) {
      this.sidemenu_viewStatus = true;
      this.showSidemenu();
    }
    else {
      this.sidemenu_viewStatus = false;
      this.hideSidemenu();
    }
  }

  toggleSidemenu() {
    if(!this.sidemenu_viewStatus) 
      this.showSidemenu();
    else 
      this.hideSidemenu();
    
  }

  showSidemenu() {
    this.sidemenu_viewStatus = true;
    anime({
      targets: '#sidebar',
      display: [
        {value: 'block', duration: 0},
        // {value: 'display', duration: sidebar_fade_duration}
      ],
      width: [
        {value: '0', duration: 0},
        {value: '80%', duration: sidebar_fade_duration}
      ],
      // opacity: [
      //   {value: '0', duration: 0},
      //   {value: '1', duration: sidebar_fade_duration}
      // ],
      
    });
    setTimeout(function(){
      let el = document.getElementById('sidebar-toggle');
      // el.style.backgroundImage = "url('../../../assets/images/menu-button-white.png')";
      el = document.getElementById('sidebar');
      el.style.zIndex = '1';

    }, sidebar_fade_duration);
  }

  hideSidemenu() {
    this.sidemenu_viewStatus = false;

    anime({
      targets: '#sidebar',
      width: [
        {value: '80%', duration: 0},
        {value: '0%', duration: sidebar_fade_duration}
      ],
      // opacity: [
      //   {value: '1', duration: 0},
      //   {value: '0', duration: sidebar_fade_duration}
      // ],
      display: [
        {value: 'display', duration: 0},
        {value: 'none', duration: sidebar_fade_duration}
      ],
    });
  
    setTimeout(function(){
      let el = document.getElementById('sidebar-toggle');
      // el.style.backgroundImage = "url('../../../assets/images/menu-button-black.png')";
      el = document.getElementById('sidebar');
      el.style.zIndex = '-1';
    }, sidebar_fade_duration+300);
  }
  

  selectButton(button: Button) {
    if(this.selectedButton)
      this.selectedButton.deselect();

    this.selectedButton = button;
    this.selectedButton.select();
    this.selectTargetEvent.emit(this.selectedButton.target);

    if(window.innerWidth < 800)
      this.hideSidemenu();
  }

  signOut() {
    this.user.signOut();
  }
  

  ngOnInit() {
    if(this.sidebar_type == 'Teacher') 
      this.buttonList = teacher_buttonList;
    
    else if(this.sidebar_type == 'Student') 
      this.buttonList = studentbuttonnList;
    let _this = this;
    document.onclick = function(event) {
      if(event.target.tagName == 'APP-CONTENT-TEACHER-QUIZZES')
        _this.hideSidemenu();
    };
  }

}
