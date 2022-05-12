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
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  @Input() product: Product;
  isEditMode = false;
  form: FormGroup;
  filedata:any;
  imagePreview:any;
  productId:number;

  constructor(private productService: ProductService,
              private loadingCtrl: LoadingController, 
              private modalCtrl: ModalController,
              public router:Router,
              private http:HttpClient,
              private alertController: AlertController) { }

  async ngOnInit() {
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
      // imageUrl: new FormControl(null, Validators.required),
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
      response = this.productService.addProduct(this.form.value);
    }

    response.pipe(take(1)).subscribe((product)=>{
      this.productId = product.id;
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
      const apiUrl = 'http://127.0.0.1:8000/updateHouseImage';
      const loading = await this.loadingCtrl.create();
      await loading.present();
      
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      console.log(this.productId);
      console.log(this.filedata);
      
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
