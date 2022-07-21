import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../schedule/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  apiUrl = 'http://192.168.1.178:80/schedule';
  apiUrl2 = 'http://192.168.1.178:80/schedule-post-user-id';
  apiUrl3 = 'http://192.168.1.178:80/delete-schedule';
  apiUrl4 = 'http://192.168.1.178:80/get_user';
  apiUrl5 = 'http://192.168.1.178:80/get_product';
  apiUrl6 = 'http://192.168.1.178:80/record_sale';
 
  

  constructor(private http: HttpClient) { }

  scheduleUser(userId: number, productId: number, productName:string, productPrice:number, productImg:string, postUserId:number, schedule): Observable<any>{
    return this.http.post(`${this.apiUrl}/${userId}/${productId}/${productName}/${productPrice}/${productImg}/${postUserId}`, schedule);
  }

  getScheduleUser(userId: number){
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getScheduleWithPostUserId(postUserId: number): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.apiUrl2}/${postUserId}`);
  }

  deleteSchedule(scheduleId: number){
    return this.http.delete(`${this.apiUrl3}/${scheduleId}`);
  }

  getUserWithId(userId: number){
    return this.http.get(`${this.apiUrl4}/${userId}`);
  }

  getProductWithId(productId: number){
    return this.http.get(`${this.apiUrl5}/${productId}`);
  }

  recordSale(scheduleId: number, userId: number, productId: number, productName:string, productPrice:number, productImg:string, postUserId:number, schedule): Observable<any>{
    return this.http.post(`${this.apiUrl6}/${scheduleId}/${userId}/${productId}/${productName}/${productPrice}/${productImg}/${postUserId}`, schedule);
  }

  

}
