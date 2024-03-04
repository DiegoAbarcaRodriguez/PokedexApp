import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CardComponent } from './card.component';
import { pokemons } from 'src/app/shared/mocks/pokemons.mock';




describe('Tests about CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemons[0];
    fixture.detectChanges();
  });

  it('should create <app-card/>', () => {
    expect(component).toBeTruthy();
  });

  it('should display the pokemon name into a <h2/> and into the attribute alt of <img/>', () => {
    const tag = fixture.debugElement.query(By.css('h2')).nativeElement;
    const tag2 = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(tag.textContent).toContain(component.pokemon?.name);
    expect(tag2.alt).toContain(component.pokemon?.name);
  });

  it('should display the pokemon img into a <img/>', () => {
    const tag = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(tag.src).toContain(component.pokemon?.image);
  });

  it('should display the pokemon id into a <span/>', () => {
    const tag = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tag.textContent).toContain(component.pokemon?.id);
  });

  it('should have a routerLink with the route pokemon/{pokemon.name}', () => {
    const tag = fixture.debugElement.query(By.directive(RouterLinkWithHref));
    expect(tag.attributes['ng-reflect-router-link']).toContain(component.pokemon?.name);
  });


});
