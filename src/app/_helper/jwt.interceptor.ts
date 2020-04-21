import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalValue } from '../shared/services/global.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private  globalValue: GlobalValue) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // console.log(this.globalConfig[0].tokenString);
        // let Token = JSON.parse(localStorage.getItem('jwt'));
        let Token = this.globalValue.getGV().tokenString;
        if (Token) {
                request = request.clone({
                        setHeaders: {
                        Authorization: `Bearer ${Token}`
                        }
                });
        }
        return next.handle(request);
    }
}
