import { Ajouter } from './ajouter';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ajouter.ts', () => {
  let component: Ajouter;
  let fixture: ComponentFixture<Ajouter>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [Ajouter] }).compileComponents();
    fixture = TestBed.createComponent(Ajouter);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });
});
