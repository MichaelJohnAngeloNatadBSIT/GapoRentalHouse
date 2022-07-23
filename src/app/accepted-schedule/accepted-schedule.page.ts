import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AcceptedScheduleService } from '../services/accepted-schedule.service';
import { tap } from 'rxjs/operators';
import { Schedule } from '../schedule/schedule.model';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../market/market.model';
import { AcceptedScheduleDetailPage } from '../accepted-schedule-detail/accepted-schedule-detail.page';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-accepted-schedule',
  templateUrl: './accepted-schedule.page.html',
  styleUrls: ['./accepted-schedule.page.scss'],
})
export class AcceptedSchedulePage implements OnInit {
  user: any;
  dates: any;
  product: any;
  products$:  Observable<Product[]>;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';
  @Input() schedule:Schedule;
  constructor(
    private acceptedService: AcceptedScheduleService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private productService: ProductService,
    private scheduleService: ScheduleService,

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
        this.dates = this.acceptedService.getScheduleById(this.user.id).pipe(
          tap(schedules=>{
            loading.dismiss();
            return schedules;
        }))
      });
  
  }

  async doRefresh(event) {
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    this.dates = this.acceptedService.getScheduleById(this.user.id).pipe(
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
      component: AcceptedScheduleDetailPage,
      componentProps: {schedule},
    });
    await modal.present();
  }

}
