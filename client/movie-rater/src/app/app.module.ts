import { CrouselComponent } from './components/crousel/crousel.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import { GenresComponent } from './components/genres/genres.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { NowplayingComponent } from './components/nowplaying/nowplaying.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    TopMoviesComponent,
    GenresComponent,
    UserProfileComponent,
    CrouselComponent,
    SearchComponent,
    FooterComponent,
    NowplayingComponent,
    UpcomingComponent
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
