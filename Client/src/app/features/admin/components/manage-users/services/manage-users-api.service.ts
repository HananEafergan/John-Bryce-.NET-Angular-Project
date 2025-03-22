import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments';
import { User } from '../../../../../shared/models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ManageUsersApiService {

  private apiUrl: string = `${environment.apiUrl}/ManageUsers`
  
    constructor(private readonly http: HttpClient) { }
  
    getUsers() {
      return this.http.get<User[]>(`${this.apiUrl}/GetUsers`).pipe(catchError(this.handleError));
    }
  
    updateUser(user: User) {
      return this.http.post<boolean>(`${this.apiUrl}/UpdateUser`, user).pipe(catchError(this.handleError));
    }
  
    deleteUser(userId: number) {
      return this.http.get<boolean>(`${this.apiUrl}/DeleteUser/${userId}`).pipe(catchError(this.handleError));
    }
  
    handleError = (error: HttpErrorResponse) => {
      return throwError(() => new Error(error.message));
    }
}
