import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'movies-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router:Router){}

  public txtInput:string = '';
  public openMenu:boolean = false;

  searchMovie(txt:string) {

    if ( txt.length < 1)return;

    const text = txt.toLowerCase();

    this.router.navigate(['/search', text]);
  }

  openCloseMenu() {
    this.openMenu = !this.openMenu;
  }



}
