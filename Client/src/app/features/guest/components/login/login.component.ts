import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed = false;
  err$!: Observable<string>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(){
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if(isAuthenticated == true){
        this.router.navigate(['home']);
      }
      else{
        this.authService.setErr('Authentication Failed');
      }
    });
    this.authService.setErr('');
    this.err$ = this.authService.err$;    
  }

  login() {
    this.authService.setErr('');
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password);    
  }
}
