import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const apiKey = localStorage.getItem('API_KEY');
        if (apiKey != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + apiKey) });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
