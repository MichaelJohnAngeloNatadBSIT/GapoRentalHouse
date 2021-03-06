import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../schedule/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class AcceptedScheduleService {
  apiUrl = 'http://192.168.1.178:80/createAcceptedSchedule';
  apiUrl2 = 'http://192.168.1.178:80/getAcceptedScheduleById';

  constructor(private http: HttpClient) { }

  acceptSchedule (userId: number, productId: number, scheduleId: number, postUserId:number, scheduleDate: string){
    return this.http.post(`${this.apiUrl}/${userId}/${productId}/${scheduleId}/${postUserId}/${scheduleDate}`,scheduleDate);
  }
  deleteSchedule(scheduleId: number):Observable<Schedule>{
    return this.http.delete<Schedule>(`${this.apiUrl}/${scheduleId}`);
  }

  getScheduleById(userId:number){
    return this.http.get(`${this.apiUrl2}/${userId}`); 
  }
}
