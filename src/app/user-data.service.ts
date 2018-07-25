import { Injectable } from '@angular/core';
import {User} from './user';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  lastId: number = 1;

  users: User[] = [];

  constructor(private api:ApiService) { }

  getAllUsers(): Observable<User[]> {
    return this.api.getAllUsers(this.lastId++);
  } 
  getPages(): Observable<number> {
    return this.api.getPages();
  } 
}
