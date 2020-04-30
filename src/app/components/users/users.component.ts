import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from '../users-form/users-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserElement } from 'src/app/interfaces/user-element';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users : any = [];
  displayedColumns : string[] = ['select', 'id', 'name', 'firstName'];
  dataSource = new MatTableDataSource<UserElement>(this.users);
  selection = new SelectionModel<UserElement>(true, []);

  constructor(
    private UsersService:UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.UsersService.users.subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource<UserElement>(this.users);
    });

    this.UsersService.getUsers();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length || 0;
    const numRows = this.dataSource.data.length || 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: UserElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'selecteer' : 'deselecteer'} alles`;
    }
    return `${this.selection.isSelected(row) ? 'deselecteer' : 'selecteer'} gebruiker ${row.id}`;
  }

  // Button Actions
  add = () => {
    let data = {
      name: '',
      firstName: '',
      mode: 'add'
    };
    
    const usersForm = this.dialog.open(UsersFormComponent, {
      width: '350px',
      data: data
    });

    usersForm.afterClosed().subscribe(result => {
      if (result) {
        this.UsersService.addUser(result).subscribe(
          data => {
            this.UsersService.getUsers();
            this.selection.clear();
            this.snackBar.open(data['success'], 'Sluiten');
          },
          error => {
            console.error(error);
            this.snackBar.open(error['error']['error'], 'Sluiten');
          }
        );
      }
    });
  }

  edit = () => {
    const dataSelected = this.selection.selected[0];
    let data = {
      id: dataSelected.id,
      name: dataSelected.name,
      firstName: dataSelected.firstName,
      mode: 'edit'
    };
    
    const usersForm = this.dialog.open(UsersFormComponent, {
      width: '350px',
      data: data
    });

    usersForm.afterClosed().subscribe(result => {
      if (result) {
        this.UsersService.editUser(result).subscribe(
          data => {
            this.UsersService.getUsers();
            this.selection.clear();
            this.snackBar.open(data['success'], 'Sluiten');
          },
          error => {
            console.error(error);
            this.snackBar.open(error['error']['error'], 'Sluiten');
          }
        );
      }
    });
  }

  delete = () => {
    const dataSelected = this.selection.selected.map(s => s.id);
    dataSelected.forEach(data => {
      this.UsersService.deleteUser(data).subscribe(
        data => {
          this.UsersService.getUsers();
          this.selection.clear();
          this.snackBar.open(data['success'], 'Sluiten');
        },
        error => {
          console.error(error);
          this.snackBar.open(error['error']['error'], 'Sluiten');
        }
      );
    });
  }
}
