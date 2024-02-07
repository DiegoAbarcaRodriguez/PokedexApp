import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'pokemon-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Input()
  pokemon?: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }


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
}
