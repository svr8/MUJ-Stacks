import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import anime from 'animejs';
import { SignInService } from 'src/app/services/sign-in.service';
import { Router } from '@angular/router';

const swipe_duration = 600;
const swipe_delay = 45;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [SignInService]
})
export class SigninComponent implements OnInit {

  title = 'muj-stacks';
  signIn_email = new FormControl('');
  signIn_password = new FormControl('');

  signUp_name = new FormControl('');
  signUp_email = new FormControl('');
  signUp_password = new FormControl('');
  signUp_confirmPassword = new FormControl('');
  password_match = false;  
  signUp_accountType = new FormControl('');
  
  public selectSignIn(showFormID, hideFormID) {
    
    // TOGGLE-BUTTON ANIMATIONS:
    let el;

    el = document.getElementById('register-toggle-signup');
    el.classList.remove('register-toggle-button-select');
    el = document.getElementById('register-toggle-signin');
    el.classList.add('register-toggle-button-select');

    anime({
      targets: '#register-toggle-select',
      left: [
        {value: '0%', duration: 1600}
      ],
    });
    

    // FORM ANIMATIONS:
    this.toggleForm(showFormID, hideFormID);
  }
  public selectSignUp(showFormID, hideFormID) {
    // TOGGLE-BUTTON ANIMATIONS:
    let el;
    
    el = document.getElementById('register-toggle-signup');
    el.classList.add('register-toggle-button-select');
    el = document.getElementById('register-toggle-signin');
    el.classList.remove('register-toggle-button-select');
    
    anime({
      targets: '#register-toggle-select',
      left: [
        {value: '50%', duration: 1600},
      ],
    });
      
    // FORM ANIMATIONS:
    this.toggleForm(showFormID, hideFormID);
  }

  public toggleForm(showFormID, hideFormID) {
    let elTarget;
    
     if(showFormID=='register-form-signup') {
      
      //SLIDE IN SIGN-UP FORM
      anime({
        targets: '#register-form-wrap',
        left: [
          { value: '20%', duration: 0},
          { value: '0%', duration: swipe_duration },
          { value: '80%', duration: swipe_delay },
          { value: '20%', duration: swipe_duration}
        ],

        opacity: [
          {value: '1', duration: 0},
          {value: '0', duration: swipe_duration},
          {value: '0', duration: swipe_delay},
          {value: '1', duration: swipe_duration}
        ],        
        easing: 'easeInOutQuint'
      });
    }
    else {

      //SLIDE IN SIGN-In FORM
      anime({
        targets: '#register-form-wrap',
        left: [
          { value: '20%', duration: 0},
          { value: '80%', duration: swipe_duration },
          { value: '0%', duration: swipe_delay },
          { value: '20%', duration: swipe_duration}
        ],

        opacity: [
          {value: '1', duration: 0},
          {value: '0', duration: swipe_duration},
          {value: '0', duration: swipe_delay},
          {value: '1', duration: swipe_duration}
        ],
        easing: 'easeInOutQuint'        
      });
    }
    
    //UPDATE FORM DATA DURING FORM ANIMATION ( WHEN FORM CONTENT IS INVISIBLE )
    setTimeout(function(){
      elTarget = document.getElementById(hideFormID);
      elTarget.style.display = 'none';
      elTarget = document.getElementById(showFormID);
      elTarget.style.display = 'block'   
      }, 
      swipe_duration+60
    );

  }

  public checkPasswordMatch() {
   this.password_match = this.signUp_password.value == this.signUp_confirmPassword.value;
   console.log(this.password_match);
  }

  public signIn() {
    let email = this.signIn_email.value;
    let password = this.signIn_password.value;
    this._authSerivce.signInWithEmailandPassword(email, password);
  }

  public signUp() {
    let userDetail = {
      name:  this.signUp_name.value,
      email: this.signUp_email.value,
      password: this.signUp_password.value,
      confirmPassword: this.signUp_confirmPassword.value,
      account_type: this.signUp_accountType.value
    };
    this._authSerivce.createUserWithEmailAndPassword(userDetail);    
  }

  constructor(private _authSerivce: SignInService, private router: Router) {
    let uid = localStorage.getItem('uid');
    if(uid && uid!='null' && uid!='undefined')
      this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
