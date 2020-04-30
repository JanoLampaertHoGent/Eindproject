import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  private _trash:any = [];
  trashSubject:Subject<any> = new Subject<any>();
  trash = this.trashSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    this.getTrash();
  }

  // Get
  getTrash = () => {
    this.http.get(`${GlobalVariables.APIBaseURL}/trash`).subscribe(data => {
      this._trash = data;
      this.trashSubject.next(this._trash);
    });
  }

  // Patch
  resetTrash = (part, id) => {
    return this.http.patch(`${GlobalVariables.APIBaseURL}/trash/${part}/${id}`, {});
  }

  // Delete
  deleteTrash(part, id) {
    return this.http.delete(`${GlobalVariables.APIBaseURL}/trash/${part}/${id}`);
  }
}
