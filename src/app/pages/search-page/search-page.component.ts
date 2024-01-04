import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, pipe, switchMap } from 'rxjs';
import { MovieTvData } from 'src/app/interfaces/search-movie-tv.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  public movies:MovieTvData[] = [];
  public tvSeries:MovieTvData[] = [];
  public txt:string = '';


  constructor(private moviesService:MoviesService,
              private aRouter:ActivatedRoute,){}


  ngOnInit(): void {
    this.aRouter.params.subscribe (({text}) => {
      this.searchMovieAndTv(text,'movie');
      this.searchMovieAndTv(text,'tv');
    })
  }

  searchMovieAndTv(txt:string,type:string){

    this.txt= txt;

    this.moviesService.getBySearch(txt,type).subscribe( moviesTv => {
      if(type === 'movie'){
        this.movies = moviesTv;
        this.movies = this.movies.filter(path => path.poster_path != null);
      }else if (type === 'tv'){
        this.tvSeries = moviesTv;
        this.tvSeries = this.tvSeries.filter( path => path.poster_path != null);
      } return
    } )
  }




}
