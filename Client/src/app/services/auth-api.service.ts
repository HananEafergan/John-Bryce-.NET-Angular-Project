import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl: string = `${environment.apiUrl}/Auth`
  constructor(private readonly http: HttpClient) { }

  authenticate(user: User){
    return this.http.post<User>(`${this.apiUrl}/Login`, user).pipe(catchError(this.handleError));
  }

  register(user: User){
    return this.http.post<User>(`${this.apiUrl}/Register`, user).pipe(catchError(this.handleError));
  }
  
  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}

