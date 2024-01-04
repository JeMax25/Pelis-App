import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { MovieData, Movies, Result } from '../interfaces/movies.interface';
import { Genre, MovieId } from '../interfaces/movie-id.interface';
import { CastMovie } from '../interfaces/cast.interface';
import { Trending, ResultTrend, TrendData } from '../interfaces/top.interface';
import { TvSerie } from '../interfaces/tv-serie.interface';
import { GenreMAT } from '../interfaces/genres.interface';
import { MovieTv, MovieTvData } from '../interfaces/search-movie-tv.interface';

@Injectable({providedIn: 'root'})
export class MoviesService {

  private baseUrl:string = 'https://api.themoviedb.org/3/';
  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzA2NTczNTk3NmNhNzM0MmI5OWNkNDEzYWJkZmYyOSIsInN1YiI6IjY1MmQ4MThhMDI0ZWM4MDEwMTUzMmEzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IWXQRZ9SesjEEMUbd9EHPiBCi3sQ_DPI25weqbIBUf0'
    }
  };

  constructor(private http: HttpClient) { }


  getTrending():Observable<TrendData[]> {

    const url:string = 'https://api.themoviedb.org/3/trending/all/day?language=es-ES';

    return this.http.get<Trending>(`${url}`,this.options)
    .pipe(
      map( data => data.results.map( result => ({
        id: result.id,
        poster_path: result.poster_path,
        media_type: result.media_type as string
      }))),
    )

  }

  getNowPlaying(query:string,page:number):Observable<MovieData> {

    const language:string = '?language=es-ES&page=';

    return this.http.get<Movies>(`${this.baseUrl}movie/${query}${language}${page}`,this.options)
      .pipe(
        map(movies => ({
          data: movies.results
        }))
      )

  }

  getDetailsById(id:number | string):Observable<MovieId> {

    const language:string = '?language=es-ES';

    return this.http.get<MovieId>(`${this.baseUrl}movie/${id}${language}`,this.options);
  }

  getCredits(id:number | string,media:string):Observable<CastMovie> {

    const language:string = '?language=es-ES';

    return this.http.get<CastMovie>(`${this.baseUrl}${media}${id}/credits${language}`,this.options)

  }

  getCreditsSerieTv(id:string | number):Observable<TvSerie> {

    const language:string = '?language=es-ES';

    return this.http.get<TvSerie>(`${this.baseUrl}tv/${id}${language}`,this.options)

  }

  getGenres(media:string):Observable<Genre[]> {

    return this.http.get<GenreMAT>(`${this.baseUrl}genre/${media}/list?language=es`,this.options)
    .pipe(
      map( listGenres => listGenres.genres )
    )

  }

  getByGenre(media:string ,id:string | number,page:number):Observable<Result[]> {

    const params = new HttpParams()
    .set('language', 'es-ES')
    .set('page', page)
    .set('sort_by', 'popularity.desc')
    .set('with_genres', id)

    const options = {params, ...this.options}

    return this.http.get<Movies>(`${this.baseUrl}discover/${media}`,options)
    .pipe(
      map( listMovies => listMovies.results)
    )


  }

  getBySearch(txt:string,type:string,page?:string):Observable<MovieTvData[]> {

    if (!page) {
      page = '1'
    }

    const params = new HttpParams()
    .set('query',txt)
    .set('include_adult', 'false')
    .set('language', 'es-ES')
    .set('page', page)

    const options = {params,...this.options}


    return this.http.get<MovieTv>(`${this.baseUrl}search/${type}`,options)
    .pipe(
      map(moviesTv => moviesTv.results.map( result => ({
        id: result.id,
        poster_path: result.poster_path,
        media_type: type,
      }))))

  }
}
