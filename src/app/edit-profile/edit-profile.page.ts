import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { EditProfileService } from '../services/edit-profile.service';
import { User } from './edit-profile.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  form: FormGroup;
  @Input() user: User;

  constructor(private http: HttpClient,
              public router:Router,
              private fb:FormBuilder, 
              private editProfileService: EditProfileService,
              private loadingCtrl: LoadingController,
              ) { }

  async ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
    const header = new HttpHeaders({
      'Authorization': `Bearer  ${localStorage.getItem('token')}`,
     });
      await this.http.get('http://192.168.1.178:80/user', {headers: header}).subscribe(
      (result: any) => {
        this.user = result
        this.setFormValues(this.user.id, this.user.first_name, this.user.last_name, this.user.email);
      });
  }

  setFormValues(id, first_name, last_name, email){
    this.form.setValue({
      first_name: first_name,
      last_name: last_name,
      email: email,
    });
    this.form.updateValueAndValidity();
  }

 async updateUserDetails(){
    const loading = await this.loadingCtrl.create({message: 'Loading....'});
    loading.present();
    let response: Observable<User>;

    response = this.editProfileService.updateUser(this.user.id, this.form.value);
    response.pipe(take(1)).subscribe((product)=>{
      loading.dismiss();
      this.router.navigate(['/tablinks'])
    });
  }

}
