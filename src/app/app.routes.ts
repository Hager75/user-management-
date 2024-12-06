import { Routes } from '@angular/router';
import { LoginContainerComponent } from './features/login-container/login-container.component';
import { authGuard } from './core/guards/auth-guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginContainerComponent,
        canActivate: [loginGuard],
    },
    {
        path: 'user-list',
        canMatch: [authGuard],
        loadComponent: () =>import("./features/user-list-container/user-list-container.component").then((m) => m.UserListContainerComponent),
    },
    { path: '**', redirectTo: '' },
];
