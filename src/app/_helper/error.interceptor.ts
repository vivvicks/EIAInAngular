import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalValue } from '../shared/services/global.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( private  globalValue: GlobalValue) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // localStorage.removeItem('UserInfo');
                // localStorage.removeItem('jwt');
                this.globalValue.clearGV();
                location.reload(true);
                // this.globalConfig[0].tokenString = '';
            }
            const error = err.error.message || err.statusText;
            // console.log(error);
            return throwError(error);
        }));
    }
}
