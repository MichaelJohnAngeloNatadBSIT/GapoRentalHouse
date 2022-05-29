import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../schedule/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class AcceptedScheduleService {
  apiUrl = 'http://192.168.1.178:80/createAcceptedSchedule';

  constructor(private http: HttpClient) { }

  acceptSchedule (userId: number, productId: number, scheduleId: number, scheduleDate: string){
    return this.http.post(`${this.apiUrl}/${userId}/${productId}/${scheduleId}/${scheduleDate}`,scheduleDate);
  }
  deleteSchedule(scheduleId: number):Observable<Schedule>{
    return this.http.delete<Schedule>(`${this.apiUrl}/${scheduleId}`);
  }
}
