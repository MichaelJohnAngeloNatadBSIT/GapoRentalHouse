import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;

  constructor(private http: HttpClient, public router:Router) { 

   }

  ngOnInit() {
   
   const header = new HttpHeaders({
    'Authorization': `Bearer  ${localStorage.getItem('token')}`,
   })
    this.http.get('http://127.0.0.1:8000/user', {headers: header} ).subscribe(
    (result) => {
      this.user = result
    },
    (error) =>{
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }

    );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
