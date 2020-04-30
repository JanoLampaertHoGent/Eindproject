import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  selectedUser : number = 0;
  users : any = [];

  constructor(
    private UsersService : UsersService
  ) {
    UsersService.selectedUser.subscribe((selectedUser) => {
      this.selectedUser = selectedUser;
    });

    UsersService.users.subscribe((users) => {
      this.users = users;
    });
  }

  setSelectedUser = ($event) => {
    this.UsersService.setSelectedUser($event.value);
  }
}
