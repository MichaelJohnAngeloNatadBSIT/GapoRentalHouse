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
  
     await this.http.get('http://127.0.0.1:8000/user', {headers: header}).subscribe(
      (result: any) => {
        this.user = result;
        console.log(this.user.id)
        console.log(this.product.id);
      });

      this.form = new FormGroup({
        schedule_date: new FormControl(null, Validators.required),
      });
  }

  async submitSchedule(){
    const loading = await this.loadingController.create();
    await loading.present();
        
    console.log(this.form.value);
    console.log(this.user.id);
    console.log(this.product.id);


    this.scheduleService.scheduleUser(this.user.id, this.product.id, this.form.value).subscribe(
      async (res)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Schedule Set Successfully',
        message: 'Schedule is successfully set',
        buttons: ['OK'],
      });
      await alert.present();
    },
    async (err)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Setting Schedule Error',
        message: err.error.error,
        buttons: ['OK'],
      });
      await alert.present();
    }
    );

  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

}
