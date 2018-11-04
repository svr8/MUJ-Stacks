import { Component, OnInit } from '@angular/core';

import anime from 'animejs';

const notification_animate_duration = 2000;
const notification_stay_duration = 3500;

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async showNotification(message: string) {

    // SLIDE UP/DOWN ANIMATION
    await anime({
      targets: '#notification',
      bottom:[
        {value: '-100px', duration: 0},
        {value: '0px', duration: notification_animate_duration},
        {value: '0px', duration: notification_stay_duration},
        {value: '-100px', duration: notification_animate_duration}
      ]
    });

    // SET NOTIFICATION MESSAGE 
    let element = document.getElementById("notification");
    element.innerHTML = message;
  }

}
