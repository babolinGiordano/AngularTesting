import { HeroComponent } from './../hero/hero.component';
import { AppModule } from './../app.module';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('HeroesComponent', () => {
  let HEROES;

  beforeEach(() => {

    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    return MockBuilder(HeroesComponent, AppModule)
      .mock(HeroComponent)
      .mock(HeroService, {
        getHeroes: () => of(HEROES),
        addHero: () => of(null),
        deleteHero: () => of(null)
      });
  });

  it('should set heroes correctly from the service', () => {
    const fixture = MockRender(HeroesComponent);

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should delete a hero from heroes', () => {
    const fixture = MockRender(HeroesComponent);

    fixture.componentInstance.delete(HEROES[0]);

    expect(fixture.componentInstance.heroes.length).toBe(2);
  });

  it('should add a new hero to heroes array', () => {
    const fixture = MockRender(HeroesComponent);

    fixture.componentInstance.add('SpiderWoman');

    expect(fixture.componentInstance.heroes.length).toBe(4);
  });

  it('should create one li for each hero', () => {
    const fixture = MockRender(HeroesComponent);

    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(3);
  });
});

