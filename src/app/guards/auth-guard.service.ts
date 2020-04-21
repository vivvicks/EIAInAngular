import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalValue } from '../shared/services/global.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelperService, private router: Router, private globalValue: GlobalValue) {
    }

    canActivate() {
        // const token = localStorage.getItem('jwt');
        // console.log(this.globalValue.getGV());
        const token = this.globalValue.getGV().tokenString;
        // console.log(token);
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          // console.log(this.jwtHelper.decodeToken(token));
          return true;
        }
        this.router.navigate(['']);
        return false;
      }
}
