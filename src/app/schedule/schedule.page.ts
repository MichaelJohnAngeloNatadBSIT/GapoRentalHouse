import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'ion2-calendar';
import { CalendarComponentOptions } from 'ion2-calendar'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  myDate: String = new Date("2022-04-22 09:07:43").toISOString();
  
  constructor() { }

  ngOnInit() {
    
  }


}
