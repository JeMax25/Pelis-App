import { AfterContentInit, AfterViewInit, Component, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'movies-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent  {

  @Input()
  public nowMovies!:Result[];

  constructor(){}


}
