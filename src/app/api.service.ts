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

  public getAllUsers(page): Observable<User[]> {
    return this.getUsers(page);
  }
  private getUsers(page) {
    var result = result||[];
    return this.http.get(API_URL + '/users?page=' + page)
    .pipe(map(response => {
      const response_filter = response.json();
      const users = response_filter['data'];
      const pages = response_filter['total_pages']
      if(pages == page)
        return null;
      Array.prototype.push.apply(result, users.map((user) => new User(user)));
      return result;
    }))
    .pipe(catchError(val => of(`Caught error: ${val}`)));
  }
  public getPages(): Observable<number> {
    var result;
    return this.http.get(API_URL + '/users?page=0')
    .pipe(map(response => {
      const response_filter = response.json();
      const pages = response_filter['total_pages']
      return pages;
    }))
    .pipe(catchError(val => of(`Caught error: ${val}`)));
  }
}
