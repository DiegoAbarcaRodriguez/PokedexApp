import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesComponent } from './features.component';
import { pokemons } from 'src/app/shared/mocks/pokemons.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('Tests about FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesComponent],
      imports: [
        SharedModule,
        CommonModule
      ]
    });
    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemons[0];
    fixture.detectChanges();
  });

  it('should create <pokemon-features/>', () => {
    expect(component).toBeTruthy();
  });

  it('should render pokemon weight property in <span/>', () => {
    const tag = fixture.debugElement.queryAll(By.css('span'))[0].nativeElement;
    expect(tag.textContent).toContain(pokemons[0].weight);
  });

  it('should render pokemon height property in <span/>', () => {
    const tag = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement;
    expect(tag.textContent).toContain(pokemons[0].height);
  });

  it('should render two pokemon moves one for each <li/>', () => {
    const tags = fixture.debugElement.queryAll(By.css('li'));

    tags.forEach((tag, index) => {
      expect(tag.nativeElement.textContent).toContain(pokemons[0].moves[index].move.name);
    });
 
  });

});
