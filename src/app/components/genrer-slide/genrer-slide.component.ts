import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Genre } from 'src/app/interfaces/movie-id.interface';
import { Result } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'genrer-slide',
  templateUrl: './genrer-slide.component.html',
  styleUrls: ['./genrer-slide.component.css']
})
export class GenrerSlideComponent implements OnInit{

  constructor(private moviesService:MoviesService){}

  @Input()
  public genreList:Genre[] =[];

  @Input()
  public media:string = '';


  @Output()
  public dataMoviesOrSeries = new EventEmitter<Result[]>()

  public moviesOrSeries:Result[] = [];
  public saveGenre:string| number = '';
  public genreColor:boolean = false;
  public id:string | number = '';
  public page:number = 1;
  public buttonDisable = false;

  ngOnInit(): void {
    this.checkResolution();
  }

  slidesPerView = 4; // Valor inicial

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.slidesPerView = 3;
    }else {
      this.slidesPerView = 4;
    }
  }


  checkResolution() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.slidesPerView = 3
    }else {
      this.slidesPerView = 4
    }
  }

  searchByGenre(media:string, id:string | number, page:number) {

    this.id = id;

    this.moviesService.getByGenre(media,id,page).subscribe( movies => {
      this.moviesOrSeries = movies
      this.dataMoviesOrSeries.emit(this.moviesOrSeries);

      if(this.moviesOrSeries.length < 20) {
        this.buttonDisable = true;
      }else {
        this.buttonDisable = false;
      }
    } )
  }

  nextPage(media:string, page:number) {

    if(this.moviesOrSeries.length < 20){
      this.buttonDisable = true;
    }

    if(this.page < 2 && page === -1)return;

    this.page = this.page + page;

    this.searchByGenre(media,this.id,this.page);


  }

  getGenreColor(id:string | number):boolean {

    if(this.saveGenre == id){
      return true
    }
    return false
  }

  changeColor(id:string | number)  {
    this.saveGenre = id;
  }

}
