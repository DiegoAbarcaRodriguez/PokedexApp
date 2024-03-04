import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { MainComponent } from './main.component';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { from, of } from 'rxjs';
import { pokemons } from '../../../shared/mocks/pokemons.mock';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';


describe('Tests about MainComponent', () => {

  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        HeaderComponent,
        CardComponent,
        NavigationComponent
      ],
      providers: [PokemonService],
      imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create <main-component/>', () => {
    expect(component).toBeTruthy();
  });

  it('should get the pokemons at the first instance', () => {

    const service = TestBed.inject(PokemonService);
    spyOn(service, 'getPokemons').and.callFake(() => from([pokemons]));
    component.ngOnInit();

    expect(component.pokemons.length).toBeGreaterThan(0);
  });

  it('should show navigation menu when there is more than 1 pokemon', () => {

    component.pokemons = pokemons;
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('app-navigation')).nativeElement;

    expect(tag).toBeTruthy();
  });

  it('should not show navigation menu when there is less than 2 pokemon', () => {

    component.pokemons.push(pokemons[0]);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('app-navigation'))?.nativeElement;

    expect(tag).toBeFalsy();
  });

  it('should show back button when there is less than 2 pokemon', () => {

    component.pokemons.push(pokemons[0]);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('button'))?.nativeElement;

    expect(tag).toBeTruthy();
  });


  it('should isProhibited be false and show <app-card/>', () => {

    component.getPokemonByNameOrId('pikachu');
    component.pokemons = pokemons;
    fixture.detectChanges();
    const tag = fixture.debugElement.query(By.css('app-card')).nativeElement

    expect(component.isProhibited).toBeFalsy();
    expect(tag).toBeTruthy();
  });

  it('should isProhibited be true and show alert "No hay resultados de busqueda"', () => {

    component.getPokemonByNameOrId('prohibido');
    component.pokemons = pokemons;
    fixture.detectChanges();
    const tag = fixture.debugElement.query(By.css('.alert')).nativeElement


    expect(component.isProhibited).toBeTruthy();
    expect(tag.textContent).toContain('No hay resultados de busqueda.');
  });

  it('should call the pokemonService and its method getPokemonByName', () => {

    const service = TestBed.inject(PokemonService);

    const spy = spyOn(service, 'getPokemonByName').and.callFake(() => of(pokemons[0]))

    component.getPokemonByNameOrId('pikachu');


    expect(spy).toHaveBeenCalledWith('pikachu');
    expect(component.pokemons).toContain(pokemons[0]);
  });







});
