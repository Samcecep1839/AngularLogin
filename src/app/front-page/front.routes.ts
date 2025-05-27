import { Routes } from "@angular/router";
import { FrontLayoutComponent } from "./layouts/front-layout/front-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { PostPageComponent } from "./pages/posts/post-page/post-page.component";
import { PostsPageComponent } from "./pages/posts/posts-page/posts-page.component";

const frontRoutes: Routes = [

  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'posts',
        component: PostsPageComponent
      },
      {
        path: 'posts/:id',
        component: PostPageComponent
      },
      {
        path: '**',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component')
      }
    ]
  }

]

export default frontRoutes;