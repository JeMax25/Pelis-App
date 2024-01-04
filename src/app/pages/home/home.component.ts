import { ResultTrend, TrendData } from './../../interfaces/top.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Cast } from 'src/app/interfaces/cast.interface';
import { MovieId } from 'src/app/interfaces/movie-id.interface';
import { Result } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nowMovies: Result[] = []
  public popularMovies:Result[] = []
  public topMovies:Result[] = []
  public moviesDetails!:MovieId
  public cast!:Cast[]
  public routeActive:string = '/home';
  public trending:TrendData[] = [];

  constructor(private moviesService:MoviesService,
              private route:ActivatedRoute,
              private router:Router){}

  ngOnInit(): void {

    this.getMovies('now_playing',1);
    this.getMovies('popular',1);
    this.getMovies('top_rated',1);
    this.getTrending();

    this.router.events.subscribe( route => {
      if (route instanceof NavigationEnd) {
        this.routeActive = route.url;

      }})

  }

  getTrending() {
    this.moviesService.getTrending().subscribe( trending => {
      this.trending = trending;
    })
  }

  getMovies(query:string,page:number) {

    if(query === 'now_playing'){
      this.moviesService.getNowPlaying(query,page).subscribe( movies => {
        this.nowMovies = movies.data;
        this.nowMovies.splice(5);
      })
    }

    if(query === 'popular'){
      this.moviesService.getNowPlaying(query,page).subscribe( movie => {
        this.popularMovies = movie.data
        this.popularMovies.splice(15)
      })
    }

    if(query === 'top_rated'){
      this.moviesService.getNowPlaying(query,page).subscribe(movie => {
        this.topMovies = movie.data
        this.topMovies.splice(15)
      })
    }

  }

}
