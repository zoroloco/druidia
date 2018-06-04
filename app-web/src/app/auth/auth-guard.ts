import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

//This needs to be @injectable because we are injecting authService to it.
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
