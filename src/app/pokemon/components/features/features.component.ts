import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { TypesOfPokemonsText } from 'src/app/shared/interfaces/types-pokemons';

@Component({
  selector: 'pokemon-features',
  templateUrl: './features.component.html',
})
export class FeaturesComponent {

  typesOfPokemonsText = TypesOfPokemonsText;

  @Input()
  pokemon?: Pokemon;
}
