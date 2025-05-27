import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { UsersPageComponent } from './pages/user/users-page/users-page.component';
import { UserPageComponent } from './pages/user/user-page/user-page.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { PostPageComponent } from './pages/post/post-page/post-page.component';
import { PostsPageComponent } from './pages/post/posts-page/posts-page.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersPageComponent,
      },
      {
        path: 'users/:id',
        component: UserPageComponent,

      },
        {
        path: 'roles',
        component: RolesPageComponent,

      },
      {
        path: 'posts',
        component: PostsPageComponent,

      },
      {
        path: 'posts/:id',
        component: PostPageComponent,

      },
      
      {
        path: '**',
        redirectTo: 'users',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default dashboardRoutes;