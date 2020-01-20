import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor( private storage: Storage, private router: Router ) {}

  async canActivate(){
    const user = await this.storage.get('user');
    if(user){
      this.router.navigateByUrl('/home');
    }else{
      return true;
    }
  }

}
