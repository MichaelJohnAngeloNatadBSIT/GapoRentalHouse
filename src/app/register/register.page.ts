import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { extractErrorMessagesFromErrorResponse } from './errorHandling';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  submitted = false;

  constructor(private fb:FormBuilder, 
              public router:Router, 
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
    });
  }

  async submit(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.submitted = true;
    const formData = this.form.getRawValue();
    console.log(formData);

    this.http.post('http://192.168.1.178/register', formData).subscribe(
      async (result) => {
        await loading.dismiss();     
        const alert = await this.alertController.create({
          header: 'Success',
          message: "User Created Successfully",
          buttons: ['OK'],
        });
        await alert.present();   
        this.router.navigate(['/login']);
        this.form.reset();
      },
      async (errorResponse: HttpErrorResponse) => {
        await loading.dismiss();        
        const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        if(messages.toString().toLocaleLowerCase().indexOf("errors")){
          const alert = await this.alertController.create({
            header: 'Register failed',
            message: messages.toString(),
            buttons: ['OK'],
          });
          await alert.present();
        }     
      }
    )
  }

  get errorCtr() {
    return this.form.controls;
  }

}
