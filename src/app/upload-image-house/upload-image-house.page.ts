import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ModalController,AlertController, NavController } from '@ionic/angular';
import { Product } from '../market/market.model';

@Component({
  selector: 'app-upload-image-house',
  templateUrl: './upload-image-house.page.html',
  styleUrls: ['./upload-image-house.page.scss'],
})
export class UploadImageHousePage implements OnInit {
  @Input() product: Product;
  // isEditMode = false;
  // form: FormGroup;
  filedata:any;
  imagePreview:any;
  productId:number;
  

  constructor(
              // private productService: ProductService,
              private loadingCtrl: LoadingController, 
              private modalCtrl: ModalController,
              private http:HttpClient,
              private alertController: AlertController
  ) { }

  async ngOnInit() {
    if(this.product){
      // this.isEditMode = true;
      // this.setFormValues();
      console.log(this.product);
      // this.product.id = this.productId;
     }
  }

  fileEvent(e){
    this.filedata = e.target.files[0];
    // this.imagePreview = this.filedata.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(this.filedata);
  }

  //image upload http://10.0.3.2:80 10.0.3.2 http://10.0.3.2:80/
  async onSubmitform(f: NgForm) {
    const apiUrl = 'http://192.168.1.178:80/updateHouseImage';
    const loading = await this.loadingCtrl.create();
    await loading.present();
    
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(this.productId);
    
    myFormData.append('image', this.filedata, this.filedata.name);
    /* Image Post Request */
    this.http.post(`${apiUrl}/${this.product.id}`, myFormData, {
    headers: headers
    }).subscribe(
    async(data) => {
     //Check success message
     await loading.dismiss();
     const alert = await this.alertController.create({
       header: 'Updated Successfully',
       message: 'Image is updated Successfully',
       buttons: ['OK'],
     });
     await alert.present();
    });  

}

}
