import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1) {
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.getApiKey());
  }

  getMovieDetails(filmeId) {
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=` + this.getApiKey());
  }

  getApiKey():string {
    return "be477b40e6251aa459d3949567b80397";
  }
}
