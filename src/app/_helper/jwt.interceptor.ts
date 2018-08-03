import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let Token = JSON.parse(localStorage.getItem('jwt'));
        if (Token) 
        {
                request = request.clone({
                        setHeaders: { 
                        Authorization: `Bearer ${Token}`
                        }
                });
        }        
        return next.handle(request);
    }
}
