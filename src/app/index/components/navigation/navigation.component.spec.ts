import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('Tests about NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        CommonModule,
        HttpClientModule
      ],
      providers: [PokemonService]
    });
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create <app-navigation/>', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled the left button when numberOffsetPokemons!<=0', () => {

    component.numberOffsetPokemons = 0;
    fixture.detectChanges();

    const tag = fixture.debugElement.queryAll(By.css('.btn'))[0]?.nativeElement;
    expect(tag.disabled).toBeTrue();
  });

  it('should be disabled the right button when numberOffsetPokemons>1005', () => {

    component.numberOffsetPokemons = 1006;
    fixture.detectChanges();

    const tag = fixture.debugElement.queryAll(By.css('.btn'))[1]?.nativeElement;
    expect(tag.disabled).toBeTrue();
  });


  it('should provide the numberOffsetPokemons from the pokemonService when it is define', () => {

    const service = TestBed.inject(PokemonService);

    service.offset = 20;
    fixture.detectChanges();
    component.ngAfterContentInit();

    expect(component.numberOffsetPokemons).toBe(20);
  });

  it('should plus 20 and emit to the new numberOffsetPokemons value after clicking the right button', () => {

    component.numberOffsetPokemons = 0;
    fixture.detectChanges();

    let newValue: number = 0;

    component.onNumberOffsetPokemons.subscribe((value) => newValue = value);

    const tag = fixture.debugElement.queryAll(By.css('.btn'))[1];
    tag.triggerEventHandler('click');

    expect(newValue).toBe(20);
  });

  it('should minus 20 and emit to the new numberOffsetPokemons value after clicking the left button', () => {

    component.numberOffsetPokemons = 20;
    fixture.detectChanges();

    let newValue: number = 0;

    component.onNumberOffsetPokemons.subscribe((value) => newValue = value);

    const tag = fixture.debugElement.queryAll(By.css('.btn'))[0];
    tag.triggerEventHandler('click');

    expect(newValue).toBe(0);
  });





});
