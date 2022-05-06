import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }
  // , password_confirmation

  register(form: {first_name, last_name, email, password, password_confirmation}): Observable<any> {
    const formData = form;
    console.log(formData);

    return this.http.post('http://127.0.0.1:8000/register', formData).pipe(map((data: any) => {
      data.json();
    }),
    // {
    //   return data.json();
    // }
    
    );
    
    // .subscribe(
    //   result => { return true; },
    //   error => console.log(error)
    // )
  }
}
