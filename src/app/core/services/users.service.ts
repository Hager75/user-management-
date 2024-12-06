import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserListResponse, UserResponse } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUserList(data: { page: number }): Observable<UserListResponse> {
    return this.http.get<UserListResponse>('users', { params: { page: data.page.toString() } });
  }

  getUserInfo(id:number):Observable<UserResponse>{
    return this.http.get<UserResponse>('users', { params: { id: id.toString() } });
  }

  deleteUser(id:number): Observable<UserListResponse> {
    return this.http.delete<UserListResponse>('users', { params: { id: id.toString() } });
  }


}
