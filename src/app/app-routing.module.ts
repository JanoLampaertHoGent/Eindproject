import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TrashComponent } from './components/trash/trash.component';


const routes: Routes = [
  { path: "",             component: NotesComponent },
  { path: "notes",        component: NotesComponent },
  { path: "categories",   component: CategoriesComponent },
  { path: "users",        component: UsersComponent},
  { path: "trash",        component: TrashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
