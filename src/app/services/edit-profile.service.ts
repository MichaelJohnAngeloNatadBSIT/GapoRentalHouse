import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../edit-profile/edit-profile.model';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  apiUrl = 'http://192.168.1.178:80/';

 
  constructor(private http:HttpClient) { }

  updateUser(userId: number, user: User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}update/${userId}`, user);
  }

  changePassword(userId:number, user: User):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}change-password/${userId}`, user)
  }

}
