import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../edit-profile/edit-profile.model';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  apiUrl = 'http://127.0.0.1:8000/update';

 
  constructor(private http:HttpClient) { }

  updateUser(userId: number, user: User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

}
