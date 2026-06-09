import { Liste } from './liste';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carte } from './models/carte.model';
import { effect } from '@angular/core';

describe('component liste', () => {
  let component: Liste;
  let fixture: ComponentFixture<Liste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Liste] }).compileComponents();

    fixture = TestBed.createComponent(Liste);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  it('should have its objects set to null and have an empty formGroup', () => {
    expect(component.file).toBe(null);
    expect(component.selectedCard).toBe(null);
    expect(component.cards()).toStrictEqual([]);
    Object.keys(component.formulaire.controls).forEach((key) => {
      expect(component.formulaire.get(key)?.value).toStrictEqual('');
    });
  });

  describe('ngOnInit', () => {
    it('should reset the form', () => {
      const spyFetch = vi
        .spyOn(window, 'fetch')
        .mockResolvedValue({ json: () => Promise.resolve({}) } as Response);
      const nom = component.formulaire.get('nom')!;
      nom.setValue('test');
      expect(nom.value).toStrictEqual('test');
      component.ngOnInit();
      expect(nom.value).toStrictEqual('');
    });
  });
  describe('confirmChanges', () => {
    afterEach(() => vi.clearAllMocks());
    it('should alert if the name field is empty', async () => {
      const spy = vi.spyOn(window, 'alert');
      component.formulaire.value.nom = '';
      await component.confirmChanges();
      expect(spy).toHaveBeenCalledWith('Veuillez renseigner un nom pour la carte');
    });
    it('should alert if the name field contains the name of an unselected card', async () => {
      const spyAlert = vi.spyOn(window, 'alert');
      const spyFetch = vi
        .spyOn(window, 'fetch')
        .mockResolvedValue({ json: () => Promise.resolve({}) } as Response);
      const spySendUpdateRequest = vi.spyOn(component as any, 'sendUpdateRequest');
      component.cards.set([
        {
          id: '1',
          nom: 'nom',
        } as Carte,
        {
          id: '2',
          nom: 'nom2',
        } as Carte,
      ]);
      component.selectedCard = {
        id: '2',
        nom: 'nom',
      } as Carte;
      component.formulaire.get('nom')?.setValue('nom');
      await component.confirmChanges();
      expect(spyAlert).toHaveBeenCalledWith('Nom déjà pris ; veuillez réessayer');
      expect(spySendUpdateRequest).toHaveBeenCalledTimes(0);
    });
    it('should call sendUpdateRequest and set the selected card and file to null', async () => {
      const spyAlert = vi.spyOn(window, 'alert');
      const spyFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
        json: () => Promise.resolve({}),
      } as Response);
      const spySendUpdateRequest = vi
        .spyOn(component as any, 'sendUpdateRequest')
        .mockResolvedValue(undefined);
      component.cards.set([
        {
          id: '1',
          nom: 'nom',
        } as Carte,
        {
          id: '2',
          nom: 'nom2',
        } as Carte,
      ]);
      component.selectedCard = {
        id: '2',
        nom: 'nom',
      } as Carte;
      component.formulaire.get('nom')?.setValue('nouveauNom');
      await component.confirmChanges();
      expect(spyAlert).toHaveBeenCalledTimes(0);
      expect(spySendUpdateRequest).toHaveBeenCalledOnce();
      expect(component.selectedCard).toBe(null);
      expect(component.file).toBe(null);
    });
  });
  describe('openInOverlay', () => {
    it('should return if the selected card is falsy', () => {
      component.openInOverlay(''); //sets selected to null
      expect(component.formulaire.get('nom')?.value).toStrictEqual('');
    });
    it('should patch the formGroup values', () => {
      const spy = vi.spyOn(component as any, 'findById').mockReturnValue({
        nom: 'nom',
        id: '1',
        effet: '',
        description: '',
        type: '',
        atk: '',
        pdv: '',
        cout: '',
      });
      component.openInOverlay('1');
      expect(component.formulaire.get('nom')?.value).toStrictEqual('nom');
    });
  });
  describe('closeOverlay', () => {
    it('should reset the form and clear the selected card and file', async () => {
      const spyFetch = vi
        .spyOn(window, 'fetch')
        .mockResolvedValue({ json: () => Promise.resolve({}) } as Response);
      const nom = component.formulaire.get('nom')!;
      nom.setValue('test');
      component.selectedCard = new Carte();
      component.file = new File([], 'fileName');
      await component.closeOverlay();
      expect(component.file).toBe(null);
      expect(component.selectedCard).toBe(null);
    });
    it('should fetch the cards again, in case changes have been made', () => {
      const spyFetch = vi
        .spyOn(window, 'fetch')
        .mockResolvedValue({ json: () => Promise.resolve({}) } as Response);
      component.closeOverlay();
      expect(spyFetch).toHaveBeenCalled();
    });
  });
  describe('setFile', () => {
    it('should set the file depending on the event', () => {
      const mockFile = new File([], 'fileName');
      const event = { target: { files: [mockFile] } } as any;
      component.setFile(event);
      expect(component.file).toBe(mockFile);
    });
  });
  describe('onEscape', () => {
    it('should call closeOverlay if a card is selected', async () => {
      const spyFetch = vi
        .spyOn(window, 'fetch')
        .mockResolvedValue({ json: () => Promise.resolve({}) } as Response);
      const spy = vi.spyOn(component, 'closeOverlay');
      component.selectedCard = new Carte();
      await component.onEscape();
      expect(spy).toHaveBeenCalledOnce();
    });
    it('should not call closeOverlay if no card is selected', () => {
      const spy = vi.spyOn(component, 'closeOverlay');
      component.onEscape();
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('onEnter', () => {
    it('should call confirmChanges if a card is selected', () => {
      const spy = vi.spyOn(component, 'confirmChanges').mockImplementation(async () => {});
      component.selectedCard = new Carte();
      component.onEnter();
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});
