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
  private user;
  private notifyController: NotificationBarComponent;

  constructor(
    private mujAuth: AngularFireAuth,
    private router: Router,
    private firebase: FirebaseService,
  ) { 
    this.notifyController = new NotificationBarComponent();
    this.user = undefined;
  }

  async createUserWithEmailAndPassword(userDetail) {
    if(userDetail.password !== userDetail.confirmPassword) {
      this.notifyController.showNotification(`Account could not be created: Passwords do not match.`);
      return;
    }

    this.notifyController.showNotification('Creating Account...');

    let _this = this;
    // CREATING USER
    this.user = await this.mujAuth.auth
      .createUserWithEmailAndPassword(userDetail.email, userDetail.password)
      .catch(function(error) {
        console.log(error.code);
        _this.notifyController.showNotification(`Account could not be created: ${error.message}`);
      });

    if (this.user == undefined) return;

    // UPLOADING ADDITIONAL USER DATA TO DATABASE
    this.user = this.user.user;
    let data = {};
    data = {
      name: userDetail.name,
      account_type: userDetail.account_type
    };
    await this.firebase.createUser(this.user.uid, data);
    this.notifyController.showNotification(`Account Created Successfully!`);
  }

  async signInWithEmailandPassword(email: string, password: string) {
    this.notifyController.showNotification('Signing In...');

    this.user = null;
    this.user = await this.mujAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error.code);
        this.notifyController.showNotification(`Sign In Failed: ${error.message}`);
      });

    if (this.user == undefined) return;
    this.user = this.user.user;
    this.notifyController.showNotification(`Signed In Successfully!`);
  }

  signOut() {
    this.notifyController.showNotification('Signing Out...');

    this.user = null;
    this.mujAuth.auth.signOut();
    this.notifyController.showNotification(`Signed Out Successfully!`);
  }
}
