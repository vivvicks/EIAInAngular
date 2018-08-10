import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { RepositoryService } from '../shared/services/repository.service';
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private repository: RepositoryService) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.repository.logout();
                location.reload(true);
            }
             
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}