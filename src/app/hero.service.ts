import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  /**
   * Retorna o HEROES ( mock-heroes ) com a lista de herois estatica
   */
  /*getHeroes(): Hero[] {
    return HEROES;
  }*/

  getHeroes(): Observable<Hero[]> {

    // TODO: send the message _after_ fetching heroes
    this.messageService.add('HeroService: feched heroes');

    // Retorna os HEROES estaticos vindos pelo import { HEROES } from './mock-heroes';
    //  return of(HEROES);

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );

  }

  /**
   * GET hero by id. Will 404 if id not found
   * @param id
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

    // TODO: send the message _after_ fetching the hero
    // this.messageService.add(`HeroService: feched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
  }

  /**
   * Log a HeroService message with the MessageService
   * @param message
   */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
