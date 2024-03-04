import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatsComponent } from '../../components/stats/stats.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Subject, of } from 'rxjs';
import { pokemons } from 'src/app/shared/mocks/pokemons.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { CommonModule } from '@angular/common';


class FakeActivatedRoute {

  event = new Subject();

  push() {
    this.event.next({ id: 21 });
  }

  get params() {
    return this.event.asObservable();
  }
}


class FakeRouter {
  navigate(params: []) {

  }

  navigateByUrl(url: string) { }
}

describe('Test about PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonComponent,
        StatsComponent,
        FeaturesComponent,
        HeaderComponent,

      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule,
        CommonModule
      ],
      providers: [
        { provide: Router, useClass: FakeRouter },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;


  });

  it('should create pokemonPage ', () => {
    expect(component).toBeTruthy();
  });

  it('should load the pokemon information provided by the activatedRoute ', () => {

    const pokemonService = TestBed.inject(PokemonService);
    spyOn(pokemonService, 'getPokemonByName').and.returnValue(of(pokemons[0]));
    spyOn(pokemonService, 'getPokemonDecription').and.returnValue(of('text mocked!'));


    component.ngOnInit();

    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push();

    expect(component.pokemon).toEqual(pokemons[0]);
    expect(component.descriptionOfPokemon).toEqual('text mocked!');


  });

  it('should direct to the home if pokemonService.getPokemonByName presents an error ', () => {

    const routerService = TestBed.inject(Router);
    const spy = spyOn(routerService, 'navigateByUrl');

    const pokemonService = TestBed.inject(PokemonService);
    spyOn(pokemonService, 'getPokemonByName').and.throwError('Error mocked!');
    spyOn(pokemonService, 'getPokemonDecription').and.returnValue(of('text mocked!'));

    component.ngOnInit();

    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push();

    expect(spy).toHaveBeenCalledWith('/');

  });

  it('should direct to the home if pokemonService.getPokemonDecription presents an error ', () => {

    const routerService = TestBed.inject(Router);
    const spy = spyOn(routerService, 'navigateByUrl');

    const pokemonService = TestBed.inject(PokemonService);
    spyOn(pokemonService, 'getPokemonByName').and.throwError('Error mocked!');
    spyOn(pokemonService, 'getPokemonDecription').and.throwError('Error mocked!');

    component.ngOnInit();

    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push();

    expect(spy).toHaveBeenCalledWith('/');

  });


  it('should redirect to the next pokemon with the next id', () => {

    const routerService = TestBed.inject(Router);
    const spy = spyOn(routerService, 'navigate');

    component.pokemon = pokemons[0];

    component.changePokemon(true);


    expect(spy).toHaveBeenCalledWith(['pokemon/', pokemons[0].id]);


  });

  it('should maintain in the same point when the pokemon id is greater than 1025', () => {

    const routerService = TestBed.inject(Router);
    const spy = spyOn(routerService, 'navigate');

    component.pokemon = pokemons[0];
    component.pokemon.id = 1026;
   

    component.changePokemon(true);


    expect(spy).toHaveBeenCalledWith(['pokemon/', pokemons[0].id]);


  });

});
