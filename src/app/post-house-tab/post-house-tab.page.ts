import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-house-tab',
  templateUrl: './post-house-tab.page.html',
  styleUrls: ['./post-house-tab.page.scss'],
})
export class PostHouseTabPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }
  addProductLink(){
    this.router.navigate(['/add-product']);
  }
  postedHouseLink(){
    this.router.navigate(['/posted-house']);
  }

  scheduleListLink(){
    this.router.navigate(['/schedule-list']);
  }

}
