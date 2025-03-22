import { Injectable } from '@angular/core';
import { ManageUsersApiService } from './manage-users-api.service';
import { BehaviorSubject, take, tap, catchError, of } from 'rxjs';
import { User } from '../../../../../shared/models/user.model';

@Injectable()
export class ManageUsersStoreService {

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get users$() {
    return this.usersSubject.asObservable();
  }

  get error$() {
    return this.errorSubject.asObservable();
  }

  setUsers(value: User[]) {
    this.usersSubject.next(value);
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }

  constructor(private readonly apiService: ManageUsersApiService) { }

  getUsers() {
    this.apiService.getUsers().pipe(take(1), tap(res => {
      this.setUsers(res);
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  updateUser(user: User) {
    this.apiService.updateUser(user).pipe(take(1), tap(res => {
      if (res == true) {
        this.getUsers();
      }
      else {
        this.setError('An error occured while updating user entry');
      }
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  deleteUser(userId: number) {
    this.apiService.deleteUser(userId).pipe(take(1), tap(res => {
      if (res == true) {
        this.getUsers();
      }
      else {
        this.setError('An error occured while deleting user entry');
      }
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }
}
