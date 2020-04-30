import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesFormData } from 'src/app/interfaces/categories-form-data';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent {
  mode:string;

  constructor(
    public dialogRef: MatDialogRef<CategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriesFormData
  ) { 
    if (data.mode == "add") this.mode = 'Toevoegen';
    else this.mode = 'Bewerken';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
