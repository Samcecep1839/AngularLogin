import { Routes } from '@angular/router';
import { authenticatedGuard } from './auth/guards/authenticated.guard';
import { notAuthenticated } from './auth/guards/notAuthenticated.guard';

export const routes: Routes = [


    {
        path: 'auth',
        canMatch: [notAuthenticated],
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'dashboard',
        canMatch: [authenticatedGuard],
        loadChildren: () => import('./admin-dashboard/dashboard.routes'),
    },
    {
        path: '',
        loadChildren: () => import('./front-page/front.routes'),
    },

];
