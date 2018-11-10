import { Component, OnInit, ViewChild } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  account_type: string;
  
  constructor(private firebase: FirebaseService, private user: SignInService) {}

  ngOnInit() {

    let _this = this;
    let uid = localStorage.getItem('uid');
    if(uid=='undefined' || uid=='null') {
       return;
    }
    this.firebase.getAccountType(function(res){
      if(res == 'Teacher' || res == 'Student') {
        _this.account_type = res;
        console.log('#' + _this.account_type);
      }
      else console.log('Undefined account_type');

    });

  }

}
