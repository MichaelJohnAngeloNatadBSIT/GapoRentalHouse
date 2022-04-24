import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {
  loggedIn = false;

  constructor() { }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('token') !== null;
  }

}
