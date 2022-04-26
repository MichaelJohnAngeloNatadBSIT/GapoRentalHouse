import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AddProductPage } from '../add-product/add-product.page';
import { Product } from '../market/market.model';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() product: Product;

  constructor(private modalCtrl: ModalController, private productService: ProductService, private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.product, role);
  }

  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component: AddProductPage,
      componentProps:{ product: this.product },
    });
    await modal.present();

    const { data: updatedProduct } = await modal.onDidDismiss();
    if (updatedProduct) {
      this.product = updatedProduct;
    }
  }

  async onDeleteProduct(){
    const loading = await this.loadingCtrl.create({message: 'Deleting....'});
    loading.present();

    this.productService.deleteProduct(this.product.id).pipe(take(1)).subscribe(()=>{
      loading.dismiss();
      this.closeModal('delete');
    });
  }

}
