import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService : fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  addMessage(message: string): void {
    this.messageService.add(message);
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T>(opration = 'opration', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${opration} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getHeroesService(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHeroService(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHeroService(hero: Hero): Observable<any> {

    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // };

    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHeroService(hero: Hero): Observable<Hero> {

    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // };

    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero id = ${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHeroService(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
