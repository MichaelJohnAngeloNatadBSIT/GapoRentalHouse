import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { LoadingController, ModalController } from '@ionic/angular';
import { Product } from '../market/market.model';
import { Schedule } from './schedule.model';
import { DetailCalendarComponent } from '../detail-calendar/detail-calendar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  user: any;
  products$: Observable<Product[]>;
  dates: any;
  schedules$:  Observable<Schedule[]>;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';

  constructor(private http: HttpClient, 
              private scheduleService: ScheduleService, 
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private router: Router,
              ) { }

  async ngOnInit() {
  }


    pendingScheduleLink(){
      this.router.navigate(['/pending-schedule']);
    }
    acceptedScheduleLink(){
      this.router.navigate(['/accepted-schedule']);
    }
}