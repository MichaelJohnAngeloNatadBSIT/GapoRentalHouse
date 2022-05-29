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

}
