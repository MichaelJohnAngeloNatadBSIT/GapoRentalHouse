import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../market/market.model';
import { map, tap } from "rxjs/operators";
import { DetailComponent } from '../detail/detail.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-posted-house',
  templateUrl: './posted-house.page.html',
  styleUrls: ['./posted-house.page.scss'],
})
export class PostedHousePage implements OnInit {
  products$: Observable<Product[]>;
  product:any;
  user: any;
  apiUrl = 'http://192.168.1.178:80/imagesHouses/';

  constructor(
    private productService: ProductService, 
    private loadingCtrl: LoadingController,
    private modalCtrl:ModalController,
    private router: Router,
    private http: HttpClient,
  ) { }

 async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Loading....'}); 
    loading.present();
    const header = new HttpHeaders({
      'Authorization': `Bearer  ${localStorage.getItem('token')}`,
     });
  
     await this.http.get('http://192.168.1.178:80/user', {headers: header}).subscribe(
      (result) => {
        this.user = result;
        this.products$ = this.productService.getProductWithUserId(this.user.id).pipe(
          tap(products=>{
            loading.dismiss();
            this.product = products;
            return products;
        }));
      });
  }

  async openDetailModal(product:Product){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
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
    this.products$ = this.productService.getProductWithUserId(this.user.id).pipe(
      tap(products=>{
        loading.dismiss();
        return products;
    }));

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
 editProductLink(){
    this.router.navigate(['/edit-product']);
  }

  backButton(){
    this.router.navigate(['/tablinks']);
  }
}
