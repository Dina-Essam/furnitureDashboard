import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map ,tap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ErrorDialogService } from '../error-dialog/errordialog.service';
import { Router } from '@angular/router';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {


    constructor(private injector: Injector,private errorDialogService: ErrorDialogService,private router:Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!window.navigator.onLine)
        {
            let data = {
                reason: "Internet is required",
                status: 502
            };
            this.errorDialogService.openDialog(data);
            return throwError(new HttpErrorResponse({ error: 'Internet is required.' }));
        }
            

        const authService = this.injector.get(AuthService);
        const token = authService.getToken();

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token') });

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if(event.body.result.status == '500')
                    this.router.navigate(['/serverError']);
                else if (event.body.result.status == '401') 
                    this.router.navigate(['/logout']);
                else if(event.body.result.status != '200' && typeof event.body.result.resultMsg != "undefined")
                {
                    let data = {};
                    data = {
                        reason: event.body.result.resultMsg,
                        status: event.body.result.status
                    };
                    this.errorDialogService.openDialog(data);
                }
            }
        }),
        catchError((error: HttpErrorResponse) => {
            if(error.status == 500)
                    this.router.navigate(['/serverError']);
            else if (error.status == 401) 
                this.router.navigate(['/logout']);
            else{
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                this.errorDialogService.openDialog(data);
            }
            return throwError(error);
        }));
    }

}