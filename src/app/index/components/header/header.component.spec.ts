import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('Tests aboout HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create <app-header/>', () => {
    expect(component).toBeTruthy();
  });

  it('should show the number of pokemons equal 1025 in a <span/>', () => {

    component.numberOfPokemons = 1025;
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('span')).nativeElement;

    expect(tag.textContent).toContain(component.numberOfPokemons);

  });

  it('should emit the value prohibido when receives a number superior to 1025', () => {

    let pokemonName: string = '';

    component.onNamePokemon.subscribe((value) => pokemonName = value);

    component.onChangeInput('1026');

    expect(pokemonName).toBe('prohibido');

  });

  it('should emit the number of name of the introduced pokemon ', () => {

    let pokemonName: string = 'pikachu';
    let valueEmitted: string = '';

    component.onNamePokemon.subscribe((value) => valueEmitted = value);

    component.onChangeInput(pokemonName);

    expect(valueEmitted).toBe(pokemonName);

  });



});
