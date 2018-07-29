import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        /*console.log(JSON.parse(localStorage.getItem('userInfo')));
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = JSON.parse(localStorage.getItem('jwt'));
        console.log('hi');
        if (userInfo && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        console.log(request);*/
        return next.handle(request);
    }
}
