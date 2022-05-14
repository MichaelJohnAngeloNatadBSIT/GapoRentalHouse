import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';


  constructor(private http: HttpClient) {
    this.loadToken();
   }

   async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: {email, password}): Observable<any> {
    const data = {
      username: credentials.email,
      password: credentials.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'T4Apu3n6dkfWH8iLDSDYHoIydk9mdqxDZphsBKAS',
      scope: '*'
    }
  
    return this.http.post('http://127.0.0.1:8000/oauth/token', data).pipe(
      map((data: any) => {
        localStorage.setItem(TOKEN_KEY, data.access_token);
        return from(Storage.set({key: TOKEN_KEY, value: data.access_token}));
      }),
      tap(_ => {
          this.isAuthenticated.next(true);
        })
    )
  }
 
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
    window.location.reload();
    return Storage.remove({key: TOKEN_KEY});
  }
}
