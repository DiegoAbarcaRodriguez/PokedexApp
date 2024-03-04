import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { pokemons } from 'src/app/shared/mocks/pokemons.mock';
import { By } from '@angular/platform-browser';


describe('Tests about StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsComponent],
      imports: [
        SharedModule,
        CommonModule
      ]
    });
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemons[0];
    fixture.detectChanges();
  });

  it('should create <pokemon-stats/>', () => {
    expect(component).toBeTruthy();
  });

  it('should the <p/> have the class .text-pink ', () => {
    const tag = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(tag.className).toContain('text-pink');
  });

  it('should the <li/> have the class .text-pink ', () => {
    const tag = fixture.debugElement.query(By.css('li')).nativeElement;
    expect(tag.className).toContain('text-pink');
  });

  it('should render the number of stast belongs to the double ofpokemon with id = 21', () => {

    const tag = fixture.debugElement.queryAll(By.css('li'));
    expect(tag.length).toBe(pokemons[0].stats.length * 2);
  });

  it('should render the stat base in a <span/>', () => {
    const tag = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tag.textContent).toContain(pokemons[0].stats[0].base_stat);
  });


});
