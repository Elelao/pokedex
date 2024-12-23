import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Species {
  id: number;
  name: string;
  types: string[];
  description: string;
  image: string;
  genre: string;
  weight: number;
  height: number;
}

export interface resultSpecies {
  data:Species[];
}

@Injectable({
  providedIn: 'root'
})


export class SpeciesService {
  private apiUrl = 'https://api.pokedexercice.ch/species';

  constructor(private http: HttpClient) { }

  getAllSpecies(): Observable<resultSpecies> {
    return this.http.get<resultSpecies>(this.apiUrl);
  }

  getSpeciesById(id: number): Observable<Species> {
    return this.http.get<Species>(`${this.apiUrl}/${id}`);
  }

  identifySpecies(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(this.apiUrl + "/identify", formData);
  }

  
  
}