import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { pokemons } from 'src/app/shared/mocks/pokemons.mock';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router} from '@angular/router';

describe('Test about HeaderComponent from pokemon', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        PokemonService,
        Router
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemons[0];
    fixture.detectChanges();
  });

  it('should create <pokemon-header/> ', () => {
    expect(component).toBeTruthy();
  });

  it('should render name of pokemon selected in <span/> ', () => {

    const tag = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tag.textContent).toBe(pokemons[0].name);
  });

  it('should render id of pokemon selected in <span/> ', () => {


    const tag = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement;
    expect(tag.textContent).toContain(pokemons[0].id);
  });

  it('should pokemon id = 20 be called, the router.navigateByUrl and set pokemon.offset = 20 when the method setBackPokemon() is called', () => {
    const routerService = TestBed.inject(Router);
    const pokemonService = TestBed.inject(PokemonService);
    const spyNavigateByUrl = spyOn(routerService, 'navigateByUrl');

    component.setBackPokemon();

    expect(component.pokemon?.id).toBe(20);
    expect(spyNavigateByUrl).toHaveBeenCalledOnceWith('/');
    expect(pokemonService.offset).toBe(20);




  });


});




