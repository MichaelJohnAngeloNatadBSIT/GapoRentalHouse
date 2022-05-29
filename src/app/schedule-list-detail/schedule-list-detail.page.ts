import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Schedule } from '../schedule/schedule.model';
import { AcceptedScheduleService } from '../services/accepted-schedule.service';
import { take } from 'rxjs/operators';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule-list-detail',
  templateUrl: './schedule-list-detail.page.html',
  styleUrls: ['./schedule-list-detail.page.scss'],
})
export class ScheduleListDetailPage implements OnInit {
  @Input() schedule: Schedule;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';
  form: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private acceptService: AcceptedScheduleService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      schedule_date: new FormControl(null, Validators.required),
    });
  }
  

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async acceptSchedule(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.acceptService.acceptSchedule(this.schedule.user_id, this.schedule.product_id, this.schedule.id, this.schedule.schedule_date).subscribe(
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
    );
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
