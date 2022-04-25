import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private fb:FormBuilder, private http:HttpClient, public router:Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    });
  }

  submit(){
    this.submitted = true;
    const formData = this.form.getRawValue();
    console.log(formData);

    this.http.post('http://127.0.0.1:8000/register', formData).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }

  get errorCtr() {
    return this.form.controls;
  }

}
