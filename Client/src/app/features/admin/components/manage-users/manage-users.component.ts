import { Component } from '@angular/core';
import { ManageUsersApiService } from './services/manage-users-api.service';
import { ManageUsersStoreService } from './services/manage-users-store.service';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
  providers: [ManageUsersApiService, ManageUsersStoreService]
})
export class ManageUsersComponent {
  users$!: Observable<User[]>
  error$!: Observable<string>;

  constructor(private readonly store: ManageUsersStoreService) {
    this.users$ = this.store.users$;
    this.error$ = this.store.error$
    this.store.getUsers();
  }
}
