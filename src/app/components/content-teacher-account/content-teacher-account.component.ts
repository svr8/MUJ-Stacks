import { Component, OnInit } from '@angular/core';
import { AccountBrief } from '../main-content/teacher/account';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-content-teacher-account',
  templateUrl: './content-teacher-account.component.html',
  styleUrls: ['./content-teacher-account.component.css']
})
export class ContentTeacherAccountComponent implements OnInit {
  
  teacher: AccountBrief;
  
  constructor(firebase: FirebaseService) { 
    let _this = this;
    this.teacher = new AccountBrief('', '', '');
    firebase.getAccountBreif(function(teacher){
      _this.teacher = teacher;
    });
  }

  ngOnInit() {
  }

}
