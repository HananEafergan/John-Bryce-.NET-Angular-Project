import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{  
  imgSrc: string = '';
  fullName: string = 'guest';

  constructor(private router: Router, private readonly auth: AuthService) {
    this.auth.isAuthenticated$.subscribe((res) => {      
      this.updateTitle();
    })
  }

  ngOnInit(): void{
    this.updateTitle();
  }

  updateTitle(){
    this.fullName = localStorage.getItem('fullName')?? 'guest';
    this.imgSrc = localStorage.getItem('profilePic') ?? '';
  }

  goHome(){
    this.router.navigate(['home']);
  }
}
