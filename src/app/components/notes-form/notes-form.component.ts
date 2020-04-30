import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesFormData } from 'src/app/interfaces/notes-form-data';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css']
})
export class NotesFormComponent {
  mode:string;
  categories : any = [];

  constructor(
    public dialogRef: MatDialogRef<NotesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotesFormData,
    private CategoriesService:CategoriesService
  ) { 
    if (data.mode == "add") this.mode = 'Toevoegen';
    else this.mode = 'Bewerken';

    this.CategoriesService.categories.subscribe((categories) => {
      this.categories = categories;
    });

    this.CategoriesService.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
