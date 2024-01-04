import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { backgroundPipe } from './pipes/background.pipe';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';

import { AppComponent } from './app.component';
import { CompleteMoviesComponent } from './ruts/complete-movies/complete-movies.component';
import { CompleteSeriesComponent } from './ruts/complete-series/complete-series.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeSlideMoviesComponent } from './components/home-slide-movies/home-slide-movies.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SeriesComponent } from './pages/series/series.component';
import { SlideShowComponent } from './components/slide-show/slide-show.component';
import { GenrerSlideComponent } from './components/genrer-slide/genrer-slide.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FormsModule } from '@angular/forms';
import { SlideGridComponent } from './components/slide-grid/slide-grid.component';




@NgModule({
  declarations: [
    AppComponent,
    CompleteMoviesComponent,
    CompleteSeriesComponent,
    GenrerSlideComponent,
    HomeComponent,
    HomeSlideMoviesComponent,
    MoviesComponent,
    NavBarComponent,
    SearchPageComponent,
    SeriesComponent,
    SlideShowComponent,

    //pipe
    backgroundPipe,
    MinutesToHoursPipe,
    SlideGridComponent,




  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
