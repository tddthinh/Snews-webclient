import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CONFIGS } from '../my-config';
import { User } from './object/user';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(public location: Location, public router: Router) { }

  canActivate(): boolean {
    const user = new User();
    console.log(user);
    if(user.token === undefined) return false;
    const path = this.location.path().substring(1);
    console.log(path);
    if(path === 'events'){
      
      return true;
    }else if(path === 'dashboard'){
      
      return true;
    }
    return true;
  }
}
