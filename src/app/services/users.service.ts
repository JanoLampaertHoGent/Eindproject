import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GlobalVariables } from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _selectedUser:number = 0;
  selectedUserSubject:Subject<number> = new Subject<number>();
  selectedUser = this.selectedUserSubject.asObservable();

  private _users:any = [];
  usersSubject: Subject<any> = new Subject<any>();
  users = this.usersSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    this.getUsers();
  }

  setSelectedUser = (userId) => {
    this._selectedUser = userId;
    this.selectedUserSubject.next(this._selectedUser);
  }

  // Get
  getUsers = () => {
    this.http.get(`${GlobalVariables.APIBaseURL}/users`).subscribe(data => {
      this._users = data;
      this.usersSubject.next(this._users);
    });
  }

  // Post
  addUser = (userData) => {
    let body = {
      name: userData.name,
      firstName: userData.firstName
    };

    return this.http.post(`${GlobalVariables.APIBaseURL}/users`, body);
  }

  // Put
  editUser = (userData) => {
    let body = {
      name: userData.name,
      firstName: userData.firstName
    }

    return this.http.put(`${GlobalVariables.APIBaseURL}/users/${userData.id}`, body);
  }

  // Delete
  deleteUser = (id:any) => {
    return this.http.delete(`${GlobalVariables.APIBaseURL}/users/${id}`);
  }
}
