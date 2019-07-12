import { UserComponent } from "./components/user/user.component";
import { TopMoviesComponent } from "./components/top-movies/top-movies.component";
import { TrailersComponent } from "./components/trailers/trailers.component";
import { HomeComponent } from "./components/home/home.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: UserComponent
  },
  {
    path: "top-movies",
    component: TopMoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "trailers",
    component: TrailersComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
