import { Injectable, untracked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon.interface';
import { environments } from '../../../environments/environments';
import { Observable, combineLatest, filter, map, switchMap, takeWhile, tap } from 'rxjs';
import { UrlPokemon } from '../interfaces/url-pokemon.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService {

    constructor(private http: HttpClient) {
        this.getOffsetFromLocalStorage();
    }

    private _offset?: number;

    numberOfPokemons: number = 0;
    requestArray: Observable<Pokemon>[] = [];


    getPokemons(offset: number = 0): Observable<Pokemon[]> {

        return this.http.get<UrlPokemon>(`${environments.url}?offset=${offset}`)
            .pipe(
                filter((resp) => resp.results.length > 0),
                tap((resp) => {
                    this.requestArray = [];
                    this.numberOfPokemons = resp.count;
                    resp.results.forEach(pokemon => {
                        this.requestArray.push(this.getPokemonByName(pokemon.name))
                    });
                }),
                switchMap(() => combineLatest(this.requestArray).pipe(
                    map((pokemons) => pokemons.filter(pokemon => pokemon.hasBeDeleted === undefined))
                ))
            );
    }

    getPokemonByName(name: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${environments.url}/${name}`)
            .pipe(
                map(pokemon => {
                    if (pokemon.id > 1025) {
                        pokemon.hasBeDeleted = true;
                    }
                    pokemon.moves = pokemon.moves.filter((move, index) => index < 2);
                    pokemon.image = `${environments.urlImage}/${pokemon.id}.png`;
                    return pokemon;
                },))
    }

    getPokemonDecription(name: string) {
        return this.http.get(`${environments.urlWithDescription}/${name}`)
            .pipe(map((pokemon: any) => pokemon.flavor_text_entries[0].flavor_text.replace('\f', ' ')))
    }


    private getOffsetFromLocalStorage() {

        if (!localStorage.getItem('offset')) {
            return;
        }
        this._offset = Number(localStorage.getItem('offset')) || 0;

    }

    set offset(offset: number) {
        this._offset = offset;
        localStorage.setItem('offset', offset.toString());

    }

    get offset(): number | undefined {
        return this._offset;
    }





}