import { CrouselComponent } from './crousel/crousel.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { NewMoviesComponent } from './new-movies/new-movies.component';
import { GenresComponent } from './genres/genres.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { SearchComponent } from './search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    TopMoviesComponent,
    NewMoviesComponent,
    GenresComponent,
    UserProfileComponent,
    CrouselComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CarouselModule,
    WavesModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
