import { NgModule } from '@angular/core';
import { RouterModule, Routes,} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SeriesComponent } from './pages/series/series.component';
import { CompleteMoviesComponent } from './ruts/complete-movies/complete-movies.component';
import { CompleteSeriesComponent } from './ruts/complete-series/complete-series.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent,
  children: [{path: 'info/:id/movie', component:CompleteMoviesComponent },
             {path: 'info/:id/tv', component:CompleteSeriesComponent}]
},
{
  path:'movies',
  component: MoviesComponent,
  children: [{path:'info/:id', component:CompleteMoviesComponent},
             {path:'**', redirectTo:'movies'}]
},
{
  path:'series',
  component: SeriesComponent,
  children: [{path:'info/:id', component: CompleteSeriesComponent},
             {path:'**', redirectTo:'series'}]
},
{
  path:'search/:text',
  component: SearchPageComponent,
  children: [{path:':id/movie' , component: CompleteMoviesComponent},
             {path:':id/tv', component:CompleteSeriesComponent}]
},
{
  path: '**',
  redirectTo: 'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
