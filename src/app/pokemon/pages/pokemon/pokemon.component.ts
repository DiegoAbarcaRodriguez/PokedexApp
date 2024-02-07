import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { Pokemon } from '../../../shared/interfaces/pokemon.interface';
import { TypesOfPokemonsBackground, TypesOfPokemonsStats, TypesOfPokemonsText } from 'src/app/shared/interfaces/types-pokemons';


@Component({
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon?: Pokemon;
  descriptionOfPokemon: string = '';
  typesOfPokemonBackground = TypesOfPokemonsBackground;

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



  changePokemon(isNext: boolean = true) {
    if (isNext && this.pokemon!.id < 1025) {
      this.router.navigate(['pokemon/', ++this.pokemon!.id]);
      return;
    }

    this.router.navigate(['pokemon/', --this.pokemon!.id]);


  }



}
