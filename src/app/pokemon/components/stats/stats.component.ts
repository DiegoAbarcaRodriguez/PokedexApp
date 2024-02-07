import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { TypesOfPokemonsBackground, TypesOfPokemonsStats, TypesOfPokemonsText } from 'src/app/shared/interfaces/types-pokemons';

@Component({
  selector: 'pokemon-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent {

  typesOfPokemonsText = TypesOfPokemonsText;
  typesOfPokemonBackground = TypesOfPokemonsBackground;
  typesOfPokemonsStats = TypesOfPokemonsStats;

  @Input()
  pokemon?: Pokemon;


}
