import { Component, HostListener, OnInit } from '@angular/core';
import { Genre } from 'src/app/interfaces/genres.interface';
import { Result } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{

  public genreMovies:Genre[] =[];

  public moviesList:Result[] = [];
  constructor (private moviesService:MoviesService){}


  ngOnInit(): void {

    this.moviesService.getGenres('movie').subscribe( genres => {

      this.genreMovies = genres

    });

  }

  takeMovies(data: Result[]) {
    this.moviesList = data
  }



}
