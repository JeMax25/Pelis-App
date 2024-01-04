import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre } from 'src/app/interfaces/movie-id.interface';
import { Result } from 'src/app/interfaces/movies.interface';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  public tvGenresList:Genre[] = [];
  public tvList:Result[] = [];

  constructor(private moviesService:MoviesService){}


  ngOnInit(): void {
    this.moviesService.getGenres('tv').subscribe( genres => {
      this.tvGenresList = genres
    })
  }

  takeSeries(tv:Result[]) {
    this.tvList = tv.filter(serie => serie.poster_path != null)

  }

}
