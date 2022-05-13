import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  apiUrl = 'http://127.0.0.1:8000/schedule';

  constructor(private http: HttpClient) { }

  scheduleUser(userId: number, productId: number, productName:string, productPrice:number, productImg:string, schedule): Observable<any>{
    return this.http.post(`${this.apiUrl}/${userId}/${productId}/${productName}/${productPrice}/${productImg}`, schedule);
  }

  getScheduleUser(userId: number){
    return this.http.get(`${this.apiUrl}/${userId}`);
  }


}
