import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { TypesOfPokemonsBackground, TypesOfPokemonsStats, TypesOfPokemonsText } from 'src/app/interfaces/types-pokemons';


@Component({
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon?: Pokemon;
  descriptionOfPokemon: string = '';
  typesOfPokemonBackground = TypesOfPokemonsBackground;
  typesOfPokemonsText = TypesOfPokemonsText;
  typesOfPokemonsStats = TypesOfPokemonsStats;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.getPokemonById();
    this.getPokemonDescription();
  }

  getPokemonById() {
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.pokemonService.getPokemonByName(id)))
      .subscribe({
        next: (pokemon) => this.pokemon = pokemon,
        error: () => this.router.navigateByUrl('/')
      });
  }

  getPokemonDescription() {
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.pokemonService.getPokemonDecription(id)))
      .subscribe({
        next: (description) => {
          this.descriptionOfPokemon = description;
        },
        error: () => this.router.navigateByUrl('/')
      });

  }

  setBackPokemon() {

    if (this.pokemon!.id % 20 === 0) {
      this.pokemon!.id -= 20;
    } else {
      while (this.pokemon!.id % 20 !== 0) {
        this.pokemon!.id--;
      }

    }


    this.pokemonService.offset = this.pokemon!.id;
    this.router.navigateByUrl('/');


  }

  changePokemon(isNext: boolean = true) {
    if (isNext && this.pokemon!.id < 1025) {
      this.router.navigate(['pokemon/', ++this.pokemon!.id]);
      return;
    }

    this.router.navigate(['pokemon/', --this.pokemon!.id]);


  }



}
