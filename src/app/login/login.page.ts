import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Command } from 'protractor';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private http: HttpClient,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // login(email,password){
  //   const data = {
  //     username: email.value,
  //     password: password.value,
  //     grant_type: 'password',
  //     client_id: 2,
  //     client_secret: 'T4Apu3n6dkfWH8iLDSDYHoIydk9mdqxDZphsBKAS',
  //     scope: '*'
  //   }

  //   this.http.post('http://127.0.0.1:8000/oauth/token', data).subscribe(
  //     (result: any) =>{
  //       localStorage.setItem('token', result.access_token);
  //       console.log(localStorage.getItem('token'));
  //       console.log(result)
  //       this.router.navigate(['/tablinks']);
  //     }
  //   );
  // }
 async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();        
        this.router.navigate(['/tablinks']);
      },
      async (res) => {
        await loading.dismiss();
        console.log(this.credentials.value);
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res,
          buttons: ['OK'],
        });
 
        await alert.present();
      }
    );
    // .then(res => {
    //   console.log(res);
    //   this.errorMessage = "";
    //   this.router.navigate(['/tablinks']);
    // }, err => {
    //   this.errorMessage = err.message;
    // })
  }

  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }

  registerLink(){
    this.router.navigate(['/register']);
  }

}
