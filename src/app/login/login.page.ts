import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Command } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit() {
  }

  login(email,password){
    const data = {
      username: email.value,
      password: password.value,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'T4Apu3n6dkfWH8iLDSDYHoIydk9mdqxDZphsBKAS',
      scope: '*'
    }

    this.http.post('http://127.0.0.1:8000/oauth/token', data).subscribe(
      (result: any) =>{
        localStorage.setItem('token', result.access_token);
        console.log(localStorage.getItem('token'));
        console.log(result)
        this.router.navigate(['/tablinks']);
      }
    );
  }

  registerLink(){
    this.router.navigate(['/register']);
  }

}
