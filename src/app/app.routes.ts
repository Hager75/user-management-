import { Routes } from '@angular/router';
import { LoginContainerComponent } from './features/login-container/login-container.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginContainerComponent,
    },
    { path: '**', redirectTo: '' },
];
