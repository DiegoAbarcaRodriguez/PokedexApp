import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pokemons: Pokemon[] = [];
  idSearchedPokemon?: number;
  isProhibited: boolean = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons(this.pokemonService.offset || 0);
  }

  getPokemons(numberOffsetPokemons: number = 0) {

    this.pokemonService.getPokemons(numberOffsetPokemons)
      .subscribe(pokemons => {

        if (pokemons.length === 0) {
          return;
        }

        this.isProhibited = false;
        this.pokemons = [];
        this.pokemons = pokemons;
      });
  }

  getPokemonByNameOrId(pokemonName: string) {


    if (pokemonName === 'prohibido') {
      this.isProhibited = true;
      return;
    }

    pokemonName = pokemonName.toLowerCase()

    this.pokemons = [];
    this.isProhibited = false;

    (this.pokemonService.offset)
      ?
      this.idSearchedPokemon = this.pokemonService.offset
      :
      this.idSearchedPokemon = undefined;


    this.callPokemonService(pokemonName)
  }

  callPokemonService(pokemonName: string) {
    this.pokemonService.getPokemonByName(pokemonName)
      .subscribe(pokemon => {

        this.pokemons.push(pokemon);

        pokemon.id === 1025
          ? this.idSearchedPokemon = pokemon.id - 2
          : this.idSearchedPokemon = pokemon.id - 1

        this.pokemonService.offset = this.idSearchedPokemon;


      }, () => this.pokemons = []
      )
  }



}


