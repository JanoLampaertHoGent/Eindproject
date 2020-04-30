import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NotesService } from 'src/app/services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NotesFormComponent } from '../notes-form/notes-form.component';
import { NotesFormData } from 'src/app/interfaces/notes-form-data';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  selectedUser : number = 0;
  notes : any = [];

  constructor(
    private UsersService : UsersService,
    private NotesService : NotesService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar
  ) { 
    this.UsersService.selectedUser.subscribe((selectedUser) => {
      this.selectedUser = selectedUser;
      this.NotesService.getNotes(this.selectedUser);
    });

    this.NotesService.notes.subscribe((notes) => {
      this.notes = notes;
      for (let index = 0; index < this.notes.length; index++) {
        this.getNotesCategories(this.notes[index].id, index);
      }
    });
  }

  getNotesCategories = (noteId, noteIndex) => {
    this.NotesService.getNotesCategories(this.selectedUser, noteId).subscribe((categories:any) => {
      this.notes[noteIndex].categories = categories;
    });
  }

  add = () => {
    let data = {
      title: "",
      content: "",
      userId: this.selectedUser,
      mode: 'add'
    };
    
    const notesForm = this.dialog.open(NotesFormComponent, {
      width: '500px',
      data: data
    });

    notesForm.afterClosed().subscribe((result) => {
      if (result) {
        this.NotesService.addNote(result).subscribe(
          data => {
            this.NotesService.addNoteCategories(data['id'], result).subscribe(
              cdata => {},
              cerror => {
                this.snackBar.open(cerror['error']['error'], 'Sluiten');
              }
            );
            
            this.NotesService.getNotes(this.selectedUser);
            this.snackBar.open(data['success'], 'Sluiten');
          },
          error => {
            this.snackBar.open(error['error']['error'], 'Sluiten');
          }
        );
      }
    });
  }

  edit = (noteId) => {
    this.NotesService.getNote(this.selectedUser, noteId).subscribe((note) => {
      note = note[0];
      this.NotesService.getNotesCategories(this.selectedUser, noteId).subscribe((categories:any[]) => {
        note['categories'] = categories.map(c => c.id);

        let data = {
          id: note['id'],
          title: note['title'],
          content: note['content'],
          categories: note['categories'],
          userId: this.selectedUser,
          mode: 'edit'
        };
  
        const notesForm = this.dialog.open(NotesFormComponent, {
          width: "500px",
          data: data
        });
  
        notesForm.afterClosed().subscribe(result => {
          if (result) {
            this.NotesService.editNote(result).subscribe(
              data => {
                this.NotesService.deleteNoteCategories(this.selectedUser, result.id).subscribe(
                  ddata => {
                    this.NotesService.addNoteCategories(result.id, result).subscribe(
                      cdata => {},
                      cerror => {
                        this.snackBar.open(cerror['error']['error'], 'Sluiten');
                      }
                    );
                  },
                  derror => {
                    this.snackBar.open(derror['error']['error'], 'Sluiten');
                  }
                );
                
                this.NotesService.getNotes(this.selectedUser);
                this.snackBar.open(data['success'], 'Sluiten');
              },
              error => {
                this.snackBar.open(error['error']['error'], 'Sluiten');
              }
            );
          }
        });
      });
    });
  }

  delete = (noteId) => {
    this.NotesService.deleteNote(noteId, this.selectedUser).subscribe(
      data => {
        this.NotesService.getNotes(this.selectedUser);
        this.snackBar.open(data['success'], 'Sluiten');
      },
      error => {
        this.snackBar.open(error['error']['error'], 'Sluiten');
      }
    );
  }
}
