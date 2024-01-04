import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/cast.interface';
import { MovieId } from 'src/app/interfaces/movie-id.interface';
import { TvSerie } from 'src/app/interfaces/tv-serie.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-complete-movies',
  templateUrl: './complete-movies.component.html',
  styleUrls: ['./complete-movies.component.css']
})
export class CompleteMoviesComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private moviesService:MoviesService,
              private router:Router){

              }


  // public rate:number = 3;

  public movieDetails!:MovieId
  public cast!:Cast[];

  public serieDetails!: TvSerie;

  public actualRoute:string = '';
  public searchRoute:string = '';

  slidesPerView = 4; // Valor inicial

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.slidesPerView = 3;
    } else {
      this.slidesPerView = 4;
    }
  }

  get closeRedirect ():string {

    if(this.actualRoute.includes('home')){
      return '/home'
    }
    if(this.actualRoute.includes('movies')){
      return '/movies'
    }
    if(this.actualRoute.includes('search')){
      return '/search/' + this.searchRoute;
    }
    return ''
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.movieById(id);
    })
    this.route.parent?.params.subscribe(parentParams => {
      this.searchRoute = parentParams['text']; // Accede al parámetro ':text' del componente padre
    });

    this.actualRoute = this.router.url;

  }

  movieById(id:string | number) {
    this.moviesService.getDetailsById(id).subscribe( details => {
      this.movieDetails = details
    })

    this.moviesService.getCredits(id,'movie/').subscribe( credits => {
      this.cast = credits.cast
      this.cast = this.cast.filter(character => character.profile_path !== null)
    })

  }

}
