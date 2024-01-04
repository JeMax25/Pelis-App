import { Component, HostListener, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { TvSerie } from '../../interfaces/tv-serie.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/cast.interface';

@Component({
  selector: 'app-complete-series',
  templateUrl: './complete-series.component.html',
  styleUrls: ['./complete-series.component.css']
})
export class CompleteSeriesComponent implements OnInit{

  public serieDetails!:TvSerie;
  public serieCredits!:Cast[]

  public actualRoute: string = '';
  public searchRoute: string = '';

  constructor(private moviesService:MoviesService,
              private route:ActivatedRoute,
              private router:Router){}

  slidesPerView = 4; // Valor inicial

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.slidesPerView = 3;
    } else {
      this.slidesPerView = 4;
    }
  }

  get closeRedirect () {
    if ( this.actualRoute.includes('home')){
      return '/home';
    }
    if( this.actualRoute.includes('series')){
      return '/series';
    }
    if(this.actualRoute.includes('search')){
      return '/search/' + this.searchRoute;
    }
    return ''

    return
  }

  ngOnInit(): void {

    this.route.parent?.params.subscribe(parentParams => {
      this.searchRoute = parentParams['text']; // Accede al parámetro ':text' del componente padre
    });

    this.actualRoute = this.router.url;

    this.route.params.subscribe(({id}) => {
      this.tvSerieById(id)
    })

  }

  tvSerieById(id:string | number) {

    this.moviesService.getCreditsSerieTv(id).subscribe( serie => {
      this.serieDetails = serie;
    })

    this.moviesService.getCredits(id,'tv/').subscribe( cast => {
      this.serieCredits = cast.cast;
      this.serieCredits = this.serieCredits.filter( actors => actors.profile_path !== null );
    })

  }

}
