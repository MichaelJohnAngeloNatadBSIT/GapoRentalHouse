import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { LoadingController, ModalController } from '@ionic/angular';
import { Product } from '../market/market.model';
import { Schedule } from './schedule.model';
import { DetailCalendarComponent } from '../detail-calendar/detail-calendar.component';

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
  apiUrl = 'http://localhost:8000/imagesHouses/';

  constructor(private http: HttpClient, 
              private scheduleService: ScheduleService, 
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Loading....'}); 
    loading.present();
    const header = new HttpHeaders({
      'Authorization': `Bearer  ${localStorage.getItem('token')}`,
     });
  
     await this.http.get('http://127.0.0.1:8000/user', {headers: header}).subscribe(
      (result) => {
        this.user = result;
        this.dates = this.scheduleService.getScheduleUser(this.user.id).pipe(
          tap(schedules=>{
            loading.dismiss();
            console.log(schedules);
            return schedules;
        }));
      });
  }

  
  async doRefresh(event) {
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    this.dates = this.scheduleService.getScheduleUser(this.user.id).pipe(
      tap(schedules=>{
        loading.dismiss();
        return schedules;
    }));

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async openCalendarModal(schedule:Schedule){
    const modal = await this.modalCtrl.create({
      component: DetailCalendarComponent,
      componentProps: {schedule},
    });
    await modal.present();
    }
}
