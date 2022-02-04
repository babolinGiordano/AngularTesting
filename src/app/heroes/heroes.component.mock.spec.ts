import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HeroComponent } from './../hero/hero.component';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent (MOCK)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;
  let httpMock;
  let target: HeroesComponent;
  let heroService;
  let messageService;

  beforeEach(() => {

    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    TestBed.configureTestingModule({
      declarations: [
        // our component for testing
        HeroesComponent,
        HeroComponent
        // the annoying dependency
        // MockComponent(HeroComponent),
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HeroService,
        MessageService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    heroService = TestBed.inject(HeroService);
    messageService = TestBed.inject(MessageService);
    httpMock = TestBed.inject(HttpTestingController);
    target = fixture.componentInstance;

  });

  afterEach(() => {
    httpMock.verify();
    fixture.destroy();
  });

  it('should set heroes correctly from the service', () => {
    fixture.detectChanges();

    const requet = httpMock.expectOne('api/heroes');
    requet.flush(HEROES, { status: 200, statusText: 'OK' });

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should delete the correct data', () => {
    // Lancio init
    fixture.detectChanges();

    // Carico i primi dati in heroes[]
    const requet = httpMock.expectOne(`api/heroes`);
    requet.flush(HEROES, { status: 200, statusText: 'OK' });

    // Aggiorno HTML dopo caricamento dati
    fixture.detectChanges();

    // Simulo il clock del bottone delete di un singolo record
    const hero = fixture.nativeElement.querySelectorAll('li')[1];
    console.log(hero);

    hero.querySelector('button').click();

    // Chiamo apoi
    const req = httpMock.expectOne(
      `api/heroes/${HEROES[1].id}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(HEROES[1], { status: 200, statusText: 'OK' });

    // Aggiorno HTML
    fixture.detectChanges();

    // Verifico che il componente abbia aggiornato la lista
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('li')[1].querySelector('span').textContent).toBe('3');
  });


  // it('should add a new hero to heroes array', () => {
  //   // const fixture = MockRender(HeroesComponent);

  //   fixture.componentInstance.add('SpiderWoman');

  //   expect(fixture.componentInstance.heroes.length).toBe(4);
  // });

  it('should create one li for each hero', () => {
    fixture.detectChanges();

    const requet = httpMock.expectOne('api/heroes');
    requet.flush(HEROES, { status: 200, statusText: 'OK' });

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(3);
  });

  it('should no create li because no hero provided', () => {
    fixture.detectChanges();

    const requet = httpMock.expectOne('api/heroes');
    requet.flush([], { status: 200, statusText: 'OK' });

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(0);
  });
});

