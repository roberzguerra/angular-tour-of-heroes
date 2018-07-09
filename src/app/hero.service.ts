import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }


  /**
   * Retorna o HEROES ( mock-heroes ) com a lista de herois estatica
   */
  /*getHeroes(): Hero[] {
    return HEROES;
  }*/

  getHeroes(): Observable<Hero[]> {

    // TODO: send the message _after_ fetching heroes
    this.messageService.add('HeroService: feched heroes');

    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: feched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
