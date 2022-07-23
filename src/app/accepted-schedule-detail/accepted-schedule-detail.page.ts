import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Schedule } from '../schedule/schedule.model';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-accepted-schedule-detail',
  templateUrl: './accepted-schedule-detail.page.html',
  styleUrls: ['./accepted-schedule-detail.page.scss'],
})
export class AcceptedScheduleDetailPage implements OnInit {
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';
  product: any;
  @Input() schedule:Schedule;

  constructor(
    private scheduleService: ScheduleService,
    private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController,

  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Loading....'}); 
    loading.present();
    this.scheduleService.getProductWithId(this.schedule.product_id).subscribe(
      (res) =>{
        this.product = res;
        console.log(this.product);
        loading.dismiss();
      })
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
