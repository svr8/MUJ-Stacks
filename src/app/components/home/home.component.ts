import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Question } from '../main-content/question';
import { NavigateService } from 'src/app/services/navigate.service';

const emptyQuestionList_Message = new Question('-', 'You have not added any questions yet.', '-');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  // Sidebar Type
  account_type: string;

  constructor(private firebase: FirebaseService, private user: SignInService,
              public navigateService: NavigateService) {}

  ngOnInit() {

    let _this = this;
    let uid = localStorage.getItem('uid');

    if(!uid || uid=='undefined' || uid=='null')
       return;

    this.firebase.getAccountType(function(res){
     
      if(res == 'Teacher' || res == 'Student') {
        _this.account_type = res;
        _this.navigateService.accountType = res;
      }
      else {
        console.log('Undefined account_type');
        this.user.signOut();
      }
    });

  }

}
