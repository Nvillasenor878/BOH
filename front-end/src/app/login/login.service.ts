import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const server = environment.server;


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(server + '/api/login', { username, password }).pipe(map(user => {
      this.currentUser = of(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    },
    (err: HttpErrorResponse)=>{
      this.currentUser=null;
      return err;
    }
    ));
  }

  validate(): any {
    return localStorage.getItem('currentUser');
  }
}
