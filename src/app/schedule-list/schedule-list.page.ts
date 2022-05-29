import { Component, OnInit } from '@angular/core';
import { Product } from '../market/market.model';
import { Schedule } from '../schedule/schedule.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ScheduleService } from '../services/schedule.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { AcceptedScheduleService } from '../services/accepted-schedule.service';
import { ScheduleListDetailPage } from '../schedule-list-detail/schedule-list-detail.page';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.page.html',
  styleUrls: ['./schedule-list.page.scss'],
})
export class ScheduleListPage implements OnInit {
  user: any;
  userInfo: any;
  products$: Observable<Product[]>;
  dates: Observable<Schedule[]>;
  schedules$:  Observable<Schedule[]>;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';
  apiUrl2 = 'http://192.168.1.178:80/userById';

  constructor(
    private scheduleService: ScheduleService,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private productService: ProductService,
    private acceptService: AcceptedScheduleService,
    private modalCtrl: ModalController,
  ) { }

 async ngOnInit() { 
  const loading = await this.loadingCtrl.create({message: 'Loading....'}); 
  loading.present();
  const header = new HttpHeaders({
    'Authorization': `Bearer  ${localStorage.getItem('token')}`,
   });

   await this.http.get('http://192.168.1.178:80/user', {headers: header}).subscribe(
    (result) => {
      this.user = result;
      this.dates = this.scheduleService.getScheduleWithPostUserId(this.user.id).pipe(
        tap(schedules=>{
          loading.dismiss();
          return schedules;   
      }));
    });
    
  }

  async doRefresh(event) {
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    this.dates= this.scheduleService.getScheduleWithPostUserId(this.user.id).pipe(
      tap(schedules=>{
        loading.dismiss();
        return schedules;
    }));

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async openDetailModal(schedule:Schedule){
    const modal = await this.modalCtrl.create({
      component: ScheduleListDetailPage,
      componentProps: {schedule},
    });
    await modal.present();
  }
  

}