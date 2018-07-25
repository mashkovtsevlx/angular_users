import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http
  ) { }

  public getAllUsers(): Observable<User[]> {
    return this.getUsers(2, undefined);
  }
  private getUsers(page, result) {
    result = result||[];
    return this.http.get(API_URL + '/users?page=1')
    .pipe(map(response => {
      const response_filter = response.json();
      const users = response_filter['data'];
      const pages = response_filter['total_pages'];
      Array.prototype.push.apply(result, users.map((user) => new User(user)));
      while (page != pages)
      {
        this.http.get(API_URL + '/users?page=' + page)
        .pipe(map(resp => {
          const response_filter = resp.json();
          const users = response_filter['data'];
          Array.prototype.push.apply(result, users.map((user) => new User(user)));
          return result;
        }))
        .pipe(catchError(val => of(`Caught inner error: ${val}`)));
        page += 1;
      }
      return result;
    }))
    .pipe(catchError(val => of(`Caught error: ${val}`)));
  }
}
