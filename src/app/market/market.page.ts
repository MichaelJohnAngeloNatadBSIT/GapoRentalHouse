import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from './market.model';
import { tap } from "rxjs/operators";
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService, 
    private loadingCtrl: LoadingController,
    private modalCtrl:ModalController,
    ) { }

  async ngOnInit() {
    // this.http.get('http://127.0.0.1:8000/products').subscribe(result=>{
    //   console.log(result);
    // })

    const loading = await this.loadingCtrl.create({message: 'Loading....'}); 
    loading.present();

    this.products$ = this.productService.getProducts().pipe(
      tap(products=>{
        loading.dismiss();
        return products;
    }));
  }

  async openDetailModal( product:Product){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {product},
    });
    modal.present();
  }


}
