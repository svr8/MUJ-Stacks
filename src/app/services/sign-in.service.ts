import { NotificationBarComponent } from '../components/notification-bar/notification-bar.component';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { FirebaseService } from "./firebase.service";

@Injectable({
  providedIn: "root"
})
export class SignInService {
  private uid;
  private userDetails;
  private notifyController: NotificationBarComponent;

  constructor(
    private mujAuth: AngularFireAuth,
    private router: Router,
    private firebase: FirebaseService,
  ) { 
    this.notifyController = new NotificationBarComponent();
   
    this.uid = localStorage.getItem('uid');
    console.log('UID found: ' + this.uid);
    
    if(this.router.url != '/register' && (this.uid == 'null' || this.uid == 'undefined')) {
      console.log('Navigating to register');
      router.navigate(['/register']);
    }
  }

  async createUserWithEmailAndPassword(userDetail) {
    if(userDetail.password !== userDetail.confirmPassword) {
      this.notifyController.showNotification(`Account could not be created: Passwords do not match.`);
      return;
    }

    this.notifyController.showNotification('Creating Account...');
    let _this = this;

    // CREATING USER
    let user = await this.mujAuth.auth
      .createUserWithEmailAndPassword(userDetail.email, userDetail.password)
      .catch(function(error) {
        console.log(error.code);
        _this.notifyController.showNotification(`Account could not be created: ${error.message}`);
      });

    if (user == undefined) return;

    // UPLOADING ADDITIONAL USER DATA TO DATABASE
    user = user['user'];
    let data = {};
    data = {
      name: userDetail.name,
      account_type: userDetail.account_type
    };
    await this.firebase.createUser(user['uid'], data);
    this.notifyController.showNotification(`Account Created Successfully!`);
  }

  async signInWithEmailandPassword(email: string, password: string) {
    this.notifyController.showNotification('Signing In...');

    let _this = this;
    let user = null;
    user = await this.mujAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error.code);
        _this.notifyController.showNotification(`Sign In Failed: ${error.message}`);
    });

    if (user == undefined) return;
    
    user = user.user;
    this.notifyController.showNotification(`Signed In Successfully!`);
    this.router.navigate(['/']);
    
    this.uid = user.uid;
    console.log('Signed In: ' + this.uid);
    localStorage.setItem('uid', this.uid);
  }

  signOut() {
    console.log('Signing Out...');
    this.notifyController.showNotification('Signing Out...');

    this.mujAuth.auth.signOut();
    this.notifyController.showNotification(`Signed Out Successfully!`);
   
    localStorage.setItem('uid', 'null');
  }
}
