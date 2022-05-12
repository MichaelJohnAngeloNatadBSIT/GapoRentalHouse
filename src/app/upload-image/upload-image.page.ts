import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../edit-profile/edit-profile.model';
import { Observable } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
  filedata:any;
  @Input() user: User;
  imagePreview:any;

  constructor(private http:HttpClient,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private router: Router,
              ) { }

  base64Image: string;
  async ngOnInit() {
    const header = new HttpHeaders({
      'Authorization': `Bearer  ${localStorage.getItem('token')}`,
     });
      await this.http.get('http://127.0.0.1:8000/user', {headers: header}).subscribe(
      (result: any) => {
        this.user = result
      });
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
      


    async onSubmitform(f: NgForm) {
      const apiUrl = 'http://127.0.0.1:8000/updateImage';
      const loading = await this.loadingController.create();
      await loading.present();
      
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      
      myFormData.append('image', this.filedata, this.filedata.name);
      /* Image Post Request */
      this.http.post(`${apiUrl}/${this.user.id}`, myFormData, {
      headers: headers
      }).subscribe(
      async(data) => {
       //Check success message
       await loading.dismiss();
       this.router.navigate(['tablinks'])
       const alert = await this.alertController.create({
         header: 'Updated Successfully',
         message: 'Image is updated Successfully',
         buttons: ['OK'],
       });
       await alert.present();
      });  
  
  }

}
