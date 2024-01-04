import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MovieTvData } from 'src/app/interfaces/search-movie-tv.interface';

@Component({
  selector: 'slide-grid',
  templateUrl: './slide-grid.component.html',
  styleUrls: ['./slide-grid.component.css']
})
export class SlideGridComponent implements OnInit {


  @Input()
  public moviesAndTv:MovieTvData[] = [];

  @Input()
  public movieConfirm:boolean = true;

  @Input()
  public text:string = '';

  public slidesPerView = 3;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (event.target.innerWidth < 768) {
      this.slidesPerView = 1;
    }else if(event.target.innerWidth < 850) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3
    }
  }

  checkResolution() {
    if(window.matchMedia('(max-width:767px)').matches) {
      this.slidesPerView = 1;
    }else if (window.matchMedia('(max-width:850px)').matches) {
      this.slidesPerView = 2;
    }else {
      this.slidesPerView = 3
    }
  }

  ngOnInit(): void {
     this.checkResolution()
  }

}
