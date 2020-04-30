import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NotesComponent } from './components/notes/notes.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';
import { TrashComponent } from './components/trash/trash.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';

// Services

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // Custom Modules
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    ToolBarComponent,
    SideNavComponent,
    NotesComponent,
    CategoriesComponent,
    UsersComponent,
    TrashComponent,
    UsersFormComponent,
    CategoriesFormComponent,
    NotesFormComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
