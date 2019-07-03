import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { NewMoviesComponent } from './new-movies/new-movies.component';
const routes: Routes = [
  {
    path: 'login',
    component: UserComponent
  },
  {
    path: 'top-movies',
    component: TopMoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-releases',
    component: NewMoviesComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
