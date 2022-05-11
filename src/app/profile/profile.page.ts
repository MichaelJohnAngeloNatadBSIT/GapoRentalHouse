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
  user:any;
  userImage:any;
  apiUrl = 'http://localhost:8000/images/';

  constructor(private http: HttpClient,
              public router:Router,
              private authService: AuthenticationService) { 
   }

  async ngOnInit() {
  
   const header = new HttpHeaders({
    'Authorization': `Bearer  ${localStorage.getItem('token')}`,
   });

   await this.http.get('http://127.0.0.1:8000/user', {headers: header}).subscribe(
    (result) => {
      this.user = result;
    });
    
  }

  async logout(){
    await this.authService.logout();
    this.router.navigate(['/']);
  }

  editProfileLink(){
    this.router.navigate(['/edit-profile']);
  }

  updatePhotoLink(){
    this.router.navigate(['/upload-image']);
  }
  addProductLink(){
    this.router.navigate(['/add-product']);
  }
  postedHouseLink(){
    this.router.navigate(['/posted-house']);
  }

  
  async doRefresh(event) {
    console.log('Begin async operation');
    const header = new HttpHeaders({
      'Authorization': `Bearer  ${localStorage.getItem('token')}`,
     });
    await this.http.get('http://127.0.0.1:8000/user', {headers: header}).subscribe(
    (result) => {
      this.user = result;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

}
