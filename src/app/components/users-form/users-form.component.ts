import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersFormData } from 'src/app/interfaces/users-form-data';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent {
  mode:string;

  constructor(
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsersFormData
  ) { 
    if (data.mode == "add") this.mode = 'Toevoegen';
    else this.mode = 'Bewerken';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
