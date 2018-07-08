import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }


  /**
   * Retorna o HEROES ( mock-heroes ) com a lista de herois estatica
   */
  /*getHeroes(): Hero[] {
    return HEROES;
  }*/

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
