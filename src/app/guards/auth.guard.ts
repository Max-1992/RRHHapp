import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor( private authService: AuthService, private router:Router ){}

canActivate(){

  if( this.authService.statusAuthentication() ){
    return true;
  } else {
    this.router.navigateByUrl('/login');
    return false;
  }

}
  
  
}
