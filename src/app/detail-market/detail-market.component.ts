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
  // @Input() user: User;
  apiUrl = 'http://localhost:8000/imagesHouses/';

  constructor(private modalCtrl: ModalController, private productService: ProductService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    
  }

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.product, role);
  }

  async openScheduleModal(){
    const modal = await this.modalCtrl.create({
      component: ScheduleVisitPage,
      componentProps:{ product: this.product},
    });
    await modal.present();

    // const { data: updatedProduct } = await modal.onDidDismiss();
    // if (updatedProduct) {
    //   this.product = updatedProduct;
    // }
  }

  async onDeleteProduct(){
    const loading = await this.loadingCtrl.create({message: 'Deleting....'});
    loading.present();

    this.productService.deleteProduct(this.product.id).pipe(take(1)).subscribe(()=>{
      loading.dismiss();
      this.closeModal('delete');
    });
  }

  async setSchedule(){
    const loading = await this.loadingCtrl.create({message:'Loading...'})
    loading.present();
  }

}
