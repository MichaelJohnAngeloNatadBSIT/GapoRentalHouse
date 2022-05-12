import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from './market.model';
import { map, tap } from "rxjs/operators";
import { DetailComponent } from '../detail/detail.component';
import { DetailMarketComponent } from '../detail-market/detail-market.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  products$: Observable<Product[]>;
  apiUrl = 'http://localhost:8000/imagesHouses/';

  constructor(
    private productService: ProductService, 
    private loadingCtrl: LoadingController,
    private modalCtrl:ModalController,
    ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Loading....'}); 
    loading.present();

    this.products$ = this.productService.getProducts().pipe(
      tap(products=>{
        loading.dismiss();
        return products;
    }));
  }

  async openDetailModal(product:Product){
    const modal = await this.modalCtrl.create({
      component: DetailMarketComponent,
      componentProps: {product},
    });
    await modal.present();

    const { data: updatedProduct, role } = await modal.onDidDismiss();
    if (updatedProduct && role === 'edit') {
      this.products$ = this.products$.pipe(
        map(products=>{
          products.forEach(prod=>{
            if(prod.id === updatedProduct.id){
              prod = updatedProduct;
            }
            return prod;
          });
          return products;
        })
      );
    }
    if(role === 'delete'){
      this.products$ = this.products$.pipe(
        map(products=>{
          products.filter(prod => prod.id != updatedProduct.id);
          return products;
        })
      );

    }
  }

  async doRefresh(event) {
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    this.products$ = this.productService.getProducts().pipe(
      tap(products=>{
        loading.dismiss();
        return products;
    }));

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
