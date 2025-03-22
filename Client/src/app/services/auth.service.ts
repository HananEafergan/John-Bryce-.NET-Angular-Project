import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, first, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private err: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isAuthenticatedSubject:  Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private readonly authApi: AuthApiService) { }

  get err$(){
    return this.err.asObservable();
  }

  get isAuthenticated$(){
    return this.isAuthenticatedSubject.asObservable();
  }

  setIsAuthenticated(value: boolean){
    this.isAuthenticatedSubject.next(value);
  }

  setErr(value: string){
    this.err.next(value);
  }

  login(username: string, password: string): void {
    let user:User = {Username : username, PasswordHash : password};
    this.authApi.authenticate(user).pipe(first()).subscribe({
      next: (res) => {
        if (res) {
          this.setUser(res);
        } else {
          this.setErr('Invalid credentials');
        }
      },
      error: (err) => {
        this.setErr(err);
      }
    });
  }

  register(user: User): void {
    this.authApi.register(user).pipe(first()).subscribe({
      next: (res) => {        
          this.setUser(res);        
      },
      error: (err) => {
        this.setErr(err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('profilePic');
    this.setIsAuthenticated(false);
    this.router.navigate(['/guest/login']);
  }

  setUser(user:User){
      localStorage.setItem('userName', user?.Username?? '');
      localStorage.setItem('userId', ""+user?.UserID);
      localStorage.setItem('role', user?.Role?? '');
      localStorage.setItem('fullName', user?.FullName?? '');
      localStorage.setItem('profilePic', user?.ProfilePicture?? '');
      this.setIsAuthenticated(true);
  }
}