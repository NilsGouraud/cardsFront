import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render nav elements text.', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.textContent).toContain('Accueil');
    expect(compiled.querySelector('nav')?.textContent).toContain('Liste des cartes');
    expect(compiled.querySelector('nav')?.textContent).toContain('Ajouter une carte');
  });
});
