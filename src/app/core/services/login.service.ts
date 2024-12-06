import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { loginUserResponse, userFormData } from '../models/user.model';
import { TOKEN_STORAGE_KEY } from '../enums/shared.enum';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  toastService = inject(ToastService);
  constructor(private http: HttpClient, private router:Router) { }

  token$ = new BehaviorSubject<string | null>(
    localStorage.getItem(TOKEN_STORAGE_KEY.TOKEN) || null
  );


  login(data:userFormData): Observable<loginUserResponse>{
    return this.http.post<loginUserResponse>(`login`, data);
  }

  logout(): void {
    this.token$.next(null);
    this.toastService.success('Logged out successful');
    localStorage.removeItem(TOKEN_STORAGE_KEY.TOKEN);
    this.router.navigate(['/']);
  }
}
