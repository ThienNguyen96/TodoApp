import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { List } from '../modal/todoModal';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { }

  getLists(): Observable<List[]> {
    return this.http.get(environment.apiUrl + '/lists')
      .pipe(
        map(d => {
          if (d) {
            return d as List[];
          }
          throwError('Error');
        }
        ));
  }

  getListInfo(listId: string): Observable<List> {
    return this.http.get(environment.apiUrl + '/lists/' + listId)
      .pipe(
        map(d => {
          if (d) {
            return d as List;
          }
          throwError('Error');
        }
        ));
  }

  addNewList(name: string): Observable<List> {
    const params = {
      name
    };
    return this.http.post(environment.apiUrl + '/lists', params)
      .pipe(
        map(d => {
          if (d) {
            return d as List;
          }
          throwError('Error');
        }
        ));
  }

  modifyList(listId: number, name: string): Observable<List> {
    const params = {
      name
    };
    return this.http.put(environment.apiUrl + '/lists/' + listId, params)
      .pipe(
        map(d => {
          if (d) {
            return d as List;
          }
          throwError('Error');
        }
        ));
  }

  removeList(listId: number): Observable<boolean> {
    return this.http.delete(environment.apiUrl + '/lists/' + listId)
      .pipe(
        map(d => {
          if (d) {
            return true;
          }
          throwError('Error');
        }
        ));
  }
}
