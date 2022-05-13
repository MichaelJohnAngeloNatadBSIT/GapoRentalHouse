import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ScheduleVisitPage } from '../schedule-visit/schedule-visit.page';
import { Product } from '../market/market.model';
// import { User } from '../edit-profile/edit-profile.model';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail-market',
  templateUrl: './detail-market.component.html',
  styleUrls: ['./detail-market.component.scss'],
})
export class DetailMarketComponent implements OnInit {

  @Input() product: Product;
  apiUrl = 'http://localhost:8000/imagesHouses/';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async openScheduleModal(){
    const modal = await this.modalCtrl.create({
      component: ScheduleVisitPage,
      componentProps:{ product: this.product},
    });
    await modal.present();
  }

}
