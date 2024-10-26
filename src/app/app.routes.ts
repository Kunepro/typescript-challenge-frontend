import { Routes } from '@angular/router'
import { AppParam } from '../types/app-param'
import { DetailComponent } from './detail/detail.component'
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  // Of course that is not really necessary with a single page map application, but ideally we want to split our app
  // into lazy loaded modules, like for example:
  // loadComponent: () => import("@some-library/routes/route-name").then((m) => m.RoutesNameComponent),
  {
    path: 'details',
    children: [
      { path: `:${AppParam.StopId}`, component: DetailComponent },
      { path: '', component: DetailComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
]
