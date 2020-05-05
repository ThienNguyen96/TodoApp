import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
      })
    };
    return this.http.post(environment.apiUrl + '/auth/login', null, httpOptions);
  }

  logout() {
    return this.http.post(environment.apiUrl + '/auth/logout', null)
      .pipe(
        map(rs => {
          if (rs) {
            return rs;
          }
          throwError('Error');
        }
        ));
  }
}
