import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  numberOfPokemons: number = 0;

  @Output()
  onNamePokemon: EventEmitter<string> = new EventEmitter();



  onChangeInput(pokemonName: string) {

    if (pokemonName.length === 0)
      return;

    if (Number(pokemonName) > 1025) {
      this.onNamePokemon.emit('prohibido');
      return;
    }


    this.onNamePokemon.emit(pokemonName);
  }



}
