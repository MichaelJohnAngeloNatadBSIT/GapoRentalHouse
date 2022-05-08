import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;

  constructor(private http: HttpClient,
              public router:Router,
              private authService: AuthenticationService) { 
   }

  ngOnInit() {
  
   const header = new HttpHeaders({
    'Authorization': `Bearer  ${localStorage.getItem('token')}`,
   });
    this.http.get('http://127.0.0.1:8000/user', {headers: header}).subscribe(
    (result) => {
      this.user = result
      console.log(this.user);
    },
    (error) =>{
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
    
  }

  async logout(){
    await this.authService.logout();
    this.router.navigate(['/']);
  }

  editProfileLink(){
    this.router.navigate(['/edit-profile']);
  }

}
