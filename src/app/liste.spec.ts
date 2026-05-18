import { Liste } from './liste';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('liste', () => {
  let component: Liste;
  let fixture: ComponentFixture<Liste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Liste] }).compileComponents();

    fixture = TestBed.createComponent(Liste);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
});
