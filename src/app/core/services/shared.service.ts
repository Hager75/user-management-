import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor() { }
    getRequestWithToken(token: string, request: HttpRequest<unknown>, headers: {
        'Access-Control-Allow-Origin': string;
        Accept: string;
    }): any {
        const headerItem: { [name: string]: string } = {
            authentication: token,
        };
        return request.clone({
            headers: new HttpHeaders({
                ...headers,
                ...headerItem,
            }),
        });
    }
}
