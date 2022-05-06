import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  // credentials: FormGroup;
  submitted = false;

  constructor(private fb:FormBuilder, 
              public router:Router, 
              private registerService: RegisterService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private http:HttpClient,
              ) { }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }


  async submit(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.submitted = true;
    const formData = this.form.getRawValue();
    console.log(formData);

    this.http.post('http://127.0.0.1:8000/register', formData).subscribe(
      async (result) => {
        await loading.dismiss();        
        this.router.navigate(['/login']);
        this.form.reset();
      },
      async  (error) => {
        await loading.dismiss();      
        console.log(error);  
        this.router.navigate(['/login']);
        this.form.reset();
      },
    )
  }

  get errorCtr() {
    return this.form.controls;
  }

}
