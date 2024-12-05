import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";

import { baseUrl } from "../../../environment/environment";

import { ToastService } from './toast.service';
import { SharedService } from './shared.service';
import { LoginService } from './login.service';

export function httpConfigInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');
  const toastService =inject(ToastService);
  const loginService =inject(LoginService);
  const sharedService = inject(SharedService);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  req = req.clone({
    headers: new HttpHeaders(headers),
    url: `${baseUrl}/${req.url}`,
  });

  return next(!token ? req : sharedService.getRequestWithToken(token, req, headers)).pipe(catchError((err: HttpErrorResponse) => {
    let errorMsg = 'An unexpected error occured!';
    if (err.status === 401) {
      // logout
      loginService.logout();
      errorMsg = "Unauthorized access - please login."
    } else {
      if (err?.error?.errors?.length) {
        errorMsg = err.error?.errors[0]?.detail;
      } else if (err?.message === "Network Error" || err.status === 0) {
        //In case of offline
        errorMsg = "Network error - please check your connection."
      }
    }
    toastService.error(`Request failed ${errorMsg}`, 'Error');
    return throwError(() => err);
  }));
}