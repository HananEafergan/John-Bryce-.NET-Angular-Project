import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RouteModel } from './models/routes.model';

@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  menuOpen = false;
  activeRoutes: RouteModel[] = [];
  guestRoutes: RouteModel[] = [
    { route: '/home', name: 'Home' },
    { route: '/cars', name: 'Browse Cars' },
    { route: '/guest/login', name: 'Login' },
    { route: '/guest/register', name: 'Sign up' },
    { route: '/contact-us', name: 'Contact Us' }
  ];
  adminRoutes: RouteModel[] = [
    { route: '/home', name: 'Home' },
    { route: '/admin/manage-branches', name: 'Manage Branches' },
    { route: '/admin/manage-cars', name: 'Manage Cars' },
    { route: '/admin/manage-rentals', name: 'Manage Rentals' },
    { route: '/admin/manage-users', name: 'Manage Users' }
  ];
  employeeRoutes: RouteModel[] = [
    { route: '/home', name: 'Home' },
    { route: '/employee/return-car', name: 'Return A Car' }
  ];
  userRoutes: RouteModel[] = [
    { route: '/home', name: 'Home' },
    { route: '/cars', name: 'Browse Cars' },
    { route: '/user/rental-history', name: 'Rental History' },
    { route: '/contact-us', name: 'Contact Us' }
  ];
  loggedIn: boolean = false;

  constructor(private router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('userName') != null;
    this.setActiveRoutes();
    this.authService.isAuthenticated$.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
      this.setActiveRoutes();
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.toggleMenu();
  }

  logOut() {
    this.authService.logout();
  }

  setActiveRoutes() {
    switch (localStorage.getItem('role')) {
      case 'Employee':
        this.activeRoutes = [...this.employeeRoutes];
        break;
      case 'User':
        this.activeRoutes = [...this.userRoutes];
        break;
      case 'Admin':
        this.activeRoutes = [...this.adminRoutes];
        break;
      default:
        this.activeRoutes = [...this.guestRoutes];
        break;
    }
  }
}