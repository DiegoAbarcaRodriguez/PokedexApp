import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { MainComponent } from './index/pages/main/main.component';
import { PokemonComponent } from './pokemon/pages/pokemon/pokemon.component';
import { routes } from './app-routing.module';


describe('Tests aboout AppComponent', () => {



  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the <app-component/>', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should be the root of the routes to point to the MainComponent', () => {

    expect(routes).toContain({
      path: '',
      component: MainComponent,
      pathMatch: 'full'
    })

  });

  it('Should be the routes has pokemon/:id', () => {

    expect(routes).toContain({
      path: 'pokemon/:id',
      component: PokemonComponent,
    })

  });

  

});
