import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../edit-profile/edit-profile.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EditProfileService } from '../services/edit-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  @Input() user: User;
  form: FormGroup;
  
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private editProfileService: EditProfileService,
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
  ) { }

 async ngOnInit() {

  this.form = this.fb.group({
    old_password: ['', Validators.required],
    new_password: ['', [Validators.required, Validators.minLength(6)]],
  });
    const header = new HttpHeaders({
      'Authorization': `Bearer  ${localStorage.getItem('token')}`,
     });
      await this.http.get('http://192.168.1.178:80/user', {headers: header}).subscribe(
      (result: any) => {
        this.user = result
        // this.setFormValues(this.user.id, this.user.first_name, this.user.last_name, this.user.email);
      });
  }

  async changePassword(){
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    let response: Observable<User>;

    response = this.editProfileService.changePassword(this.user.id, this.form.value);
    response.pipe(take(1)).subscribe(
      async(product)=>{
      loading.dismiss();
      this.form.reset();
      this.router.navigate(['/tablinks']);
      await loading.dismiss();
       const alert = await this.alertController.create({
         header: 'Password Changed Successfully',
         message: 'Your Password is changed Successfully',
         buttons: ['OK'],
       });
       await alert.present();
    },
    async (err)=>{
      await loading.dismiss();
       const alert = await this.alertController.create({
         header: 'Password Not Changed',
         message: err.error.message,
         buttons: ['OK'],
       });
       await alert.present();

    }
    );
  }
  get errorCtr() {
    return this.form.controls;
  }

}
