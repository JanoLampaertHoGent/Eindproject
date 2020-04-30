import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NotesFormData } from '../interfaces/notes-form-data';
import { GlobalVariables } from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _notes:any = [];
  notesSubject:Subject<any> = new Subject<any>();
  notes = this.notesSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  // Get
  getNotes = (userId) => {
    this.http.get(`${GlobalVariables.APIBaseURL}/users/${userId}/notes`).subscribe(data => {
      this._notes = data;
      this.notesSubject.next(this._notes);
    });
  }

  getNote = (userId, noteId) => {
    return this.http.get(`${GlobalVariables.APIBaseURL}/users/${userId}/notes/${noteId}`);
  }

  getNotesCategories = (userId, noteId) => {
    return this.http.get(`${GlobalVariables.APIBaseURL}/users/${userId}/notes/${noteId}/categories`);
  }

  // Post
  addNote = (notesData:NotesFormData) => {
    let body = {
      title: notesData.title,
      content: notesData.content
    }

    return this.http.post(`${GlobalVariables.APIBaseURL}/users/${notesData.userId}/notes`, body);
  }

  addNoteCategories = (noteId, notesData:NotesFormData) => {
      let body = {
        categoryIds: notesData.categories
      };

      return this.http.post(`${GlobalVariables.APIBaseURL}/users/${notesData.userId}/notes/${noteId}/categories`, body)
  }

  // Put
  editNote = (notesData:NotesFormData) => {
    let body = {
      title: notesData.title,
      content: notesData.content
    };

    return this.http.put(`${GlobalVariables.APIBaseURL}/users/${notesData.userId}/notes/${notesData.id}`, body);
  }

  // Delete
  deleteNote = (id:any, userId:any) => {
    return this.http.delete(`${GlobalVariables.APIBaseURL}/users/${userId}/notes/${id}`);
  }

  deleteNoteCategories = (userId, noteId) => {
    return this.http.delete(`${GlobalVariables.APIBaseURL}/users/${userId}/notes/${noteId}/categories`);
  }
}
