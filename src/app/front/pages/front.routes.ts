import { Route } from "@angular/router";
import { FrontLayoutComponent } from "../layout/front-layout/front-layout.component";
import { HomePageComponent } from "./home-page/home-page.component";

const frontRoutes: Route[] = [
    {
      path: '',
      component: FrontLayoutComponent,
      children: [ 
        {
          path: '',
          component: HomePageComponent
        }
      ]
    }
  ];
  
  export default frontRoutes;
  