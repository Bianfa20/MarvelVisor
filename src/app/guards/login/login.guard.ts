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
    const registering = await this.storage.get('registering');
    if(user && !registering){
      this.router.navigateByUrl('/home');
      this.storage.remove('registering');
    }else{
      return true;
    }
  }

}
