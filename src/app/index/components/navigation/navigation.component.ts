import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterContentInit {


  constructor(private pokemonService: PokemonService) { }


  ngAfterContentInit(): void {
    if (this.pokemonService.offset) {
      this.numberOffsetPokemons = this.pokemonService.offset!;
    }
  }


  @Input()
  numberOffsetPokemons: number = 0

  @Output()
  onNumberOffsetPokemons: EventEmitter<number> = new EventEmitter();


  changePage(isItNextOne: boolean = true) {


    if ((this.numberOffsetPokemons <= 0 && !isItNextOne)) {
      return;
    }

    if (this.numberOffsetPokemons >= 1025 && isItNextOne) {
      return
    }


    isItNextOne ? this.numberOffsetPokemons += 20 : this.numberOffsetPokemons! -= 20;

    this.pokemonService.offset = this.numberOffsetPokemons;

    this.onNumberOffsetPokemons.emit(this.numberOffsetPokemons);

  }
}
