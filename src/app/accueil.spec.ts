import { Accueil } from './accueil';
import { TestBed, ComponentFixture } from '@angular/core/testing';
describe('ajouter', () => {
  let component: Accueil;
  let fixture: ComponentFixture<Accueil>;
  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [Accueil] }).compileComponents();
    fixture = TestBed.createComponent(Accueil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
});
