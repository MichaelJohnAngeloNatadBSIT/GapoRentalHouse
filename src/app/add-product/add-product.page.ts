import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../market/market.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  @Input() product: Product;
  isEditMode = false;
  form: FormGroup;
  constructor(private productService: ProductService, private loadingCtrl: LoadingController, private modalCtrl: ModalController) { }

  ngOnInit() {
   this.initAddProductForm();

   if(this.product){
    this.isEditMode = true;
    this.setFormValues();
   }
  }

  initAddProductForm(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, Validators.required),
      description: new FormControl(null),
    })
  }

  async submitProduct(){
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    let response: Observable<Product>;

    if(this.isEditMode){
      response = this.productService.updateProduct(this.product.id, this.form.value);
    }
    else{
      response =  this.productService.addProduct(this.form.value);
    }

    response.pipe(take(1)).subscribe((product)=>{
      this.form.reset();
      loading.dismiss();
        if(this.isEditMode){
          this.closeModal(product);
        }
    });
  }
 closeModal(data = null){
   this.modalCtrl.dismiss(data);
  }

  setFormValues(){
    this.form.setValue({
      name: this.product.name,
      price: this.product.price,
      category: this.product.category,
      imageUrl: this.product.imageUrl,
      description: this.product.description,
    });
    this.form.updateValueAndValidity();
  }
}
