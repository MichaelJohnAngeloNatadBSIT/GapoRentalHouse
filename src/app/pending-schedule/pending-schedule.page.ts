import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ScheduleService } from '../services/schedule.service';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../market/market.model';
import { Schedule } from '../schedule/schedule.model';
import { tap } from 'rxjs/operators';
import { DetailCalendarComponent } from '../detail-calendar/detail-calendar.component';

@Component({
  selector: 'app-pending-schedule',
  templateUrl: './pending-schedule.page.html',
  styleUrls: ['./pending-schedule.page.scss'],
})
export class PendingSchedulePage implements OnInit {
  user: any;
  products$: Observable<Product[]>;
  dates: any;
  schedules$:  Observable<Schedule[]>;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';

  constructor(
              private http: HttpClient, 
              private scheduleService: ScheduleService, 
              private productService: ProductService, 
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private router: Router,
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
        this.dates = this.scheduleService.getScheduleUser(this.user.id).pipe(
          tap(schedules=>{
            loading.dismiss();
            return schedules;
        }));
      });

      // this.getWithProductsId();
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


  // async getWithProductsId() {
  //   const loading = await this.loadingCtrl.create({message: 'Loading....'});
  //   loading.present();

  //   this.products$ = this.productService.getProductWithId(this.dates.product_id).pipe(
  //     tap(products=>{
  //       loading.dismiss();
  //       return products;
  //   }));
  // }

  async openCalendarModal(schedule:Schedule){
    const modal = await this.modalCtrl.create({
      component: DetailCalendarComponent,
      componentProps: {schedule},
    });
    await modal.present();
    }


}
