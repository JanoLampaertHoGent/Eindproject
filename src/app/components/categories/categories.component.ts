import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryElement } from 'src/app/interfaces/category-element';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories : any = [];
  displayedColumns : string[] = ['select', 'id', 'name'];
  dataSource = new MatTableDataSource<CategoryElement>(this.categories);
  selection = new SelectionModel<CategoryElement>(true, []);

  constructor(
    private CategoriesService:CategoriesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.CategoriesService.categories.subscribe((categories) => {
      this.categories = categories;
      this.dataSource = new MatTableDataSource<CategoryElement>(this.categories);
    });

    this.CategoriesService.getCategories();
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

  checkboxLabel(row?: CategoryElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'selecteer' : 'deselecteer'} alles`;
    }
    return `${this.selection.isSelected(row) ? 'deselecteer' : 'selecteer'} gebruiker ${row.id}`;
  }

  // Button Actions
  add = () => {
    let data = {
      name: "",
      color: "",
      mode: "add"
    };
    
    const usersForm = this.dialog.open(CategoriesFormComponent, {
      width: '350px',
      data: data
    });

    usersForm.afterClosed().subscribe(result => {
      if (result) {
        this.CategoriesService.addCategory(result).subscribe(
          data => {
            this.CategoriesService.getCategories();
            this.selection.clear();
            this.snackBar.open(data['success'], 'Sluiten');
          },
          error => {
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
      color: dataSelected.color,
      mode: 'edit'
    };
    
    const usersForm = this.dialog.open(CategoriesFormComponent, {
      width: '350px',
      data: data
    });

    usersForm.afterClosed().subscribe(result => {
      if (result) {
        this.CategoriesService.editCategory(result).subscribe(
          data => {
            this.CategoriesService.getCategories();
            this.selection.clear();
            this.snackBar.open(data['success'], 'Sluiten');
          },
          error => {
            this.snackBar.open(error['error']['error'], 'Sluiten');
          }
        );
      }
    });
  }

  delete = () => {
    const dataSelected = this.selection.selected.map(s => s.id);
    dataSelected.forEach(data => {
      this.CategoriesService.deleteCategory(data).subscribe(
        data => {
          this.CategoriesService.getCategories();
          this.selection.clear();
          this.snackBar.open(data['success'], 'Sluiten');
        },
        error => {
          this.snackBar.open(error['error']['error'], 'Sluiten');
        }
      );
    });
  }
}
