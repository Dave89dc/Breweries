import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brewery } from '../models/brewery';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  breweriesURL = "https://api.openbrewerydb.org/v1/breweries";
  randomBreweriesURL = "https://api.openbrewerydb.org/v1/breweries/random";

  constructor(private http: HttpClient) { }

  getAllBreweries(): Observable<Brewery[]>{
    return this.http.get<any>(this.breweriesURL);
  }

}
