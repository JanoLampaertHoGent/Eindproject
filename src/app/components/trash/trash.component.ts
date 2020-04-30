import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TrashNoteElement } from 'src/app/interfaces/trash-note-element';
import { TrashCategoryElement } from 'src/app/interfaces/trash-category-element';
import { TrashUserElement } from 'src/app/interfaces/trash-user-element';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrashService } from 'src/app/services/trash.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent {
  notes : any = [];
  categories : any = [];
  users : any = [];

  displayedColumnsNotes : string[] = ['id', 'user', 'title', 'actions'];
  displayedColumnsCategories : string[] = ['id', 'name', 'actions'];
  displayedColumnsUsers : string[] = ['id', 'name', 'firstName', 'actions'];

  dataSourceNotes = new MatTableDataSource<TrashNoteElement>(this.notes);
  dataSourceCategories = new MatTableDataSource<TrashCategoryElement>(this.categories);
  dataSourceUsers = new MatTableDataSource<TrashUserElement>(this.users);

  constructor(
    private TrashService:TrashService,
    private UsersService:UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.TrashService.trash.subscribe((trash) => {
      this.notes = trash.notes;
      this.categories = trash.categories;
      this.users = trash.users;

      this.dataSourceNotes = new MatTableDataSource<TrashNoteElement>(this.notes);
      this.dataSourceCategories = new MatTableDataSource<TrashCategoryElement>(this.categories);
      this.dataSourceUsers = new MatTableDataSource<TrashUserElement>(this.users);
    });

    this.TrashService.getTrash();
  }

  // Reset
  resetNote = (noteId) => {
    this.reset('note', noteId);
  }

  resetCategory = (categoryId) => {
    this.reset('category', categoryId);
  }

  resetUser = (userId) => {
    this.reset('user', userId);
    this.UsersService.getUsers();
  }

  reset = (part, id) => {
    this.TrashService.resetTrash(part, id).subscribe(
      data => {
        this.TrashService.getTrash();
        this.snackBar.open(data['success'], 'Sluiten');
      },
      error => {
        this.snackBar.open(error['error']['error'], 'Sluiten');
      }
    );
  }

  // Permanent Delete
  deleteNote = (noteId) => {
    this.delete('note', noteId);
  }

  deleteCategory = (categoryId) => {
    this.delete('category', categoryId);
  }

  deleteUser = (userId) => {
    this.delete('user', userId);
    this.UsersService.getUsers();
  }
  
  delete = (part, id) => {
    this.TrashService.deleteTrash(part, id).subscribe(
      data => {
        this.TrashService.getTrash();
        this.snackBar.open(data['success'], 'Sluiten');
      },
      error => {
        this.snackBar.open(error['error']['error'], 'Sluiten');
      }
    );
  }
}
