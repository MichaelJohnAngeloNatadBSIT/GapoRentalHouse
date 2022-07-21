import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Schedule } from '../schedule/schedule.model';
import { ScheduleService } from '../services/schedule.service';


@Component({
  selector: 'app-detail-calendar',
  templateUrl: './detail-calendar.component.html',
  styleUrls: ['./detail-calendar.component.scss'],
})
export class DetailCalendarComponent implements OnInit {
  @Input() schedule:Schedule;
  dates: any;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';
  product: any;

  constructor(private modalCtrl: ModalController, 
              private loadingCtrl: LoadingController,
              private scheduleService: ScheduleService,
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
