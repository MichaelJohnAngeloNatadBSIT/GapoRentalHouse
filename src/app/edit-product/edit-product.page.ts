import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController,AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../market/market.model';
import { ProductService } from '../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  @Input() product: Product;
  form: FormGroup;
  filedata: any;
  imagePreview: any;
  productId: number;
  user: any;

  constructor(
              private productService: ProductService,
              private loadingCtrl: LoadingController, 
              private modalCtrl: ModalController,
              public router:Router,
              private http:HttpClient,
              private alertController: AlertController
  ) { }

  ngOnInit() {
    this.initAddProductForm();
    this.setFormValues();
  }
  initAddProductForm(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      // imageUrl: new FormControl(null, Validators.required),
      description: new FormControl(null),
    })
  }

  async submitProduct(){
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    let response: Observable<Product>;

    response = this.productService.updateProduct(this.product.id, this.form.value);

    response.pipe(take(1)).subscribe((product)=>{
      this.productId = product.id;
      loading.dismiss();
          this.closeModal(product);
    });
  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  setFormValues(){
    this.form.setValue({
      name: this.product.name,
      price: this.product.price,
      address: this.product.address,
      imageUrl: this.product.imageUrl,
      description: this.product.description,
    });
    this.form.updateValueAndValidity();
  }

  fileEvent(e){
    this.filedata = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(this.filedata);
  }
  

//image upload
async onSubmitform(f: NgForm) {
  const apiUrl = 'http://192.168.1.178:80/updateHouseImage';
  const loading = await this.loadingCtrl.create();
  await loading.present();
  
  var myFormData = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  
  myFormData.append('image', this.filedata, this.filedata.name);
  /* Image Post Request */
  this.http.post(`${apiUrl}/${this.productId}`, myFormData, {
  headers: headers
  }).subscribe(
  async(data) => {
    this.form.reset();
    this.router.navigate(['/posted-house']);
   //Check success message
   await loading.dismiss();
   const alert = await this.alertController.create({
     header: 'Uploaded Successfully',
     message: 'Image is uploaded Successfully',
     buttons: ['OK'],
   });
   await alert.present();
  });  
}
get errorCtr() {
return this.form.controls;
}

}
