import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { TestComponent } from './components/test/test.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { ContentTeacherQuestionsComponent } from './components/content-teacher-questions/content-teacher-questions.component';
import { NavigateService } from './services/navigate.service';
import { ContentTeacherAccountComponent } from './components/content-teacher-account/content-teacher-account.component';
import { AddNewQuestionComponent } from './components/add-new-question/add-new-question.component';
import { ContentQuestionComponent } from './components/content-question/content-question.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCdmuAhESgB-zRuLtutHUfMCG5Ocpue1EI",
  authDomain: "muj-stacks.firebaseapp.com",
  databaseURL: "https://muj-stacks.firebaseio.com",
  projectId: "muj-stacks",
  storageBucket: "muj-stacks.appspot.com",
  messagingSenderId: "428877113222"
};

const appRoutes: Routes = [
   {path: '', component: HomeComponent },
  { path: 'quiz', component: HomeComponent },
  { path: 'problems', component: HomeComponent },
  { path: 'new-problem', component: HomeComponent },
  { path: 'account', component: HomeComponent },
  { path: 'register', component: SigninComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    TestComponent,
    NotificationBarComponent,
    SidebarComponent,
    HomeComponent,
    ContentTeacherQuestionsComponent,
    ContentTeacherAccountComponent,
    AddNewQuestionComponent,
    ContentQuestionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [NotificationBarComponent, NavigateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
