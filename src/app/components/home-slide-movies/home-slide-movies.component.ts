import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Result } from 'src/app/interfaces/movies.interface';
import { ResultTrend, TrendData } from 'src/app/interfaces/top.interface';
import { MediaType } from '../../interfaces/top.interface';



@Component({
  selector: 'home-slide-movies',
  templateUrl: './home-slide-movies.component.html',
  styleUrls: ['./home-slide-movies.component.css']
})
export class HomeSlideMoviesComponent implements OnInit{


  @Input()
  public getMovies: (Result | TrendData)[] = [];

  ngOnInit(): void {
    this.checkResolution()
  }

  public slidesPerView = 7.5; // Valor inicial

  checkResolution() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.slidesPerView = 3.2;
    } else {
      this.slidesPerView = 7.5;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.slidesPerView = 3.2;
    }else {
      this.slidesPerView = 7.5;
    }
  }


  getMedia(media:Result | TrendData):string {

    if('media_type' in media) {
      switch (media.media_type) {
        case 'movie': return '/movie';
        case 'tv': return '/tv'
      }
    }else {
      return '/movie'
    }

    return '';

  }
}
