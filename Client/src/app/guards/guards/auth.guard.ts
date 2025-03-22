import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const routeRole = route.data['role'];
    const userRole = localStorage.getItem('role');

    if (routeRole == userRole) {
      return true;
    }
    
    this.router.navigate(['/unauthorized']);
    return false;
  }
}