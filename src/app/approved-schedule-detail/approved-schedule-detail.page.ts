import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Schedule } from '../schedule/schedule.model';
import { AcceptedScheduleService } from '../services/accepted-schedule.service';
import { take } from 'rxjs/operators';
import { ScheduleService } from '../services/schedule.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Product } from '../market/market.model';

@Component({
  selector: 'app-approved-schedule-detail',
  templateUrl: './approved-schedule-detail.page.html',
  styleUrls: ['./approved-schedule-detail.page.scss'],
})
export class ApprovedScheduleDetailPage implements OnInit {
  @Input() schedule: Schedule;
  @Input() product: Product;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';
  form: FormGroup;
  user: any;
  apiUrl2 = 'http://192.168.1.178:80/images/';

  constructor(
     private modalCtrl: ModalController,
    private acceptService: AcceptedScheduleService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private scheduleService: ScheduleService,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
  ) { }

  async ngOnInit() {
   // this.form = new FormGroup({
    //   schedule_date: new FormControl(null, Validators.required),
    // });
  const loading = await this.loadingCtrl.create({message: 'Loading....'}); 
  loading.present();

  this.scheduleService.getUserWithId(this.schedule.user_id).subscribe(
    (res) =>{
      this.user = res;
      loading.dismiss();
    })
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async acceptSchedule(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.acceptService.acceptSchedule(this.schedule.user_id, this.schedule.product_id, this.schedule.id, this.schedule.post_user_id, this.schedule.schedule_date).subscribe(
      async (res)=>{
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Schedule Set Successfully',
          message: 'Schedule is successfully set',
          buttons: ['OK'],
        });
        await alert.present();
        this.modalCtrl.dismiss();
      },
      async (error)=>{
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Something went wrong',
          message: error.error.error,
          buttons: ['OK'],
        });
        await alert.present();
        this.modalCtrl.dismiss();
      }
      
      );
  }

  async houseSold(){
    const loading = await this.loadingController.create({message: 'Loading....'});
    loading.present();

    this.scheduleService.recordSale(this.schedule.id, this.schedule.user_id, this.schedule.product_id, this.schedule.product_name, this.schedule.product_price, this.schedule.product_image, this.schedule.user_id, this.form).subscribe(
      async (res)=>{
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Your House is successfully sold',
          message: 'Happy to serve you',
          buttons: ['OK'],
        });
        await alert.present();
        this.modalCtrl.dismiss();
      },);
  }

  async deleteSchedule(){
    const loading = await this.loadingController.create({message: 'Deleting....'});
    loading.present();

    this.scheduleService.deleteSchedule(this.schedule.id).pipe(take(1)).subscribe(()=>{
      loading.dismiss();
      this.modalCtrl.dismiss();
    });
  }


}
