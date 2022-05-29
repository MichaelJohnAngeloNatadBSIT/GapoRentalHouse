import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input} from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Product } from '../market/market.model';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-visit',
  templateUrl: './schedule-visit.page.html',
  styleUrls: ['./schedule-visit.page.scss'],
})
export class ScheduleVisitPage implements OnInit {
  @Input() product: Product;
  user:any;
  form: FormGroup;
  minDate: string = new Date().toISOString();
  public date:any = new Date().toISOString();

  constructor(private modalCtrl:ModalController, 
              private loadingController:LoadingController, 
              private http: HttpClient,
              private scheduleService: ScheduleService,
              private alertController: AlertController,
              private router: Router,
              ) { }

  async ngOnInit() {

    const header = new HttpHeaders({
      'Authorization': `Bearer  ${localStorage.getItem('token')}`,
     });
  
     await this.http.get('http://192.168.1.178:80/user', {headers: header}).subscribe(
      (result: any) => {
        this.user = result;;
      });

      this.form = new FormGroup({
        schedule_date: new FormControl(null, Validators.required),
      });
  }

  async submitSchedule(){
    const loading = await this.loadingController.create();
    await loading.present();
        
    this.scheduleService.scheduleUser(this.user.id, this.product.id, this.product.name, this.product.price, this.product.imageUrl, this.product.user_id, this.form.value).subscribe(
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
    async (err)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Setting Schedule Error',
        message: err.error.error,
        buttons: ['OK'],
      });
      await alert.present();
    });

  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }
  
}
