import { DebugElement } from '@angular/core';
import { Ajouter } from './ajouter';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { backEndUrl } from './app';

describe('component ajouter', () => {
  let component: Ajouter;
  let fixture: ComponentFixture<Ajouter>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [Ajouter] }).compileComponents();
    fixture = TestBed.createComponent(Ajouter);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  describe('flags', () => {
    it('should be false', () => {
      [component.confirmationRequired, component.isConfirmed, component.hasBeenUpdated].forEach(
        (flag) => {
          expect(flag).toBe(false);
        },
      );
    });
  });
  describe('file', () => {
    it('should be falsy', () => {
      expect(component.file).toBeFalsy();
    });
  });
  describe('formulaire', () => {
    it('should be empty', () => {
      Object.entries(component.formulaire.value).forEach(([key, value]) => {
        expect(value).toBeFalsy;
      });
    });
    it('should require the name', () => {
      expect(component.formulaire.get('nom')?.hasValidator(Validators.required)).toBe(true);
    });
  });
  describe('serverLog', () => {
    it('should be empty', () => {
      expect(component.serverLog).toBe('');
    });
  });
  describe('cards', () => {
    it('should be empty', () => {
      expect(component.cards).toStrictEqual([]);
    });
  });
  describe('confirmOverwrite', () => {
    it('should set isConfirmed to true', () => {
      component.confirmOverwrite();
      expect(component.isConfirmed).toBe(true);
    });
    it('should call sendForm', () => {
      const spy = vi.spyOn(component, 'sendForm');
      component.confirmOverwrite();
      expect(spy).toHaveBeenCalledOnce();
    });
  });
  describe('closeConfirmation', () => {
    it('should be false', () => {
      component.confirmationRequired = true;
      component.closeConfirmation();
      expect(component.confirmationRequired).toBe(false);
    });
  });
  describe('closeUpdate', () => {
    it('should be false', () => {
      component.hasBeenUpdated = true;
      component.closeUpdate();
      expect(component.hasBeenUpdated).toBe(false);
    });
  });
  describe('sendGetRequest', () => {
    it('should fetch', async () => {
      const spy = vi.spyOn(window, 'fetch');
      await component.sendGetRequest();
      expect(spy).toHaveBeenCalledOnce();
    });
    it('should update cards value', async () => {
      const result = await component.sendGetRequest();
      expect(component.cards).toStrictEqual(result);
    });
  });
  describe('getFile', () => {
    it('should get a file', () => {
      let mockFile: File = new File([], 'test.png', { type: 'image' });
      let event: any = { target: { files: [mockFile] } };
      component.getFile(event);
      expect(component.file).toBe(mockFile);
    });
  });
  describe('template form', () => {
    it('should exist', () => {
      const inputs = [
        fixture.debugElement.query(By.css('#nom')).nativeElement,
        fixture.debugElement.query(By.css('#effet')).nativeElement,
        fixture.debugElement.query(By.css('#description')).nativeElement,
        fixture.debugElement.query(By.css('#type')).nativeElement,
        fixture.debugElement.query(By.css('#pdv')).nativeElement,
        fixture.debugElement.query(By.css('#atk')).nativeElement,
        fixture.debugElement.query(By.css('#cout')).nativeElement,
      ];
      inputs.forEach((input) => {
        expect(input).toBeTruthy();
      });
    });
    it('should be empty', () => {
      const inputs = [
        fixture.debugElement.query(By.css('#nom')).nativeElement,
        fixture.debugElement.query(By.css('#effet')).nativeElement,
        fixture.debugElement.query(By.css('#description')).nativeElement,
        fixture.debugElement.query(By.css('#type')).nativeElement,
        fixture.debugElement.query(By.css('#pdv')).nativeElement,
        fixture.debugElement.query(By.css('#atk')).nativeElement,
        fixture.debugElement.query(By.css('#cout')).nativeElement,
      ];
      inputs.forEach((input) => {
        expect(input.value).toStrictEqual('');
      });
    });
  });
  describe('getFormData', () => {
    it('should be empty', () => {
      const formData = component.getFormData();
      formData.forEach((value) => {
        expect(value).toStrictEqual('');
      });
    });
    it('should have an image field', () => {
      const image = component.getFormData().get('image');
      expect(image).toStrictEqual('');
    });
    it('should contain 1 2 3 4... as strings', () => {
      component.getFormData();
      const nom = component.formulaire.get('nom')!;
      const effet = component.formulaire.get('effet')!;
      const description = component.formulaire.get('description')!;
      const type = component.formulaire.get('type')!;
      const pdv = component.formulaire.get('pdv')!;
      const atk = component.formulaire.get('atk')!;
      const cout = component.formulaire.get('cout')!;

      expect(nom).toBeTruthy();
      expect(effet).toBeTruthy();
      expect(description).toBeTruthy();
      expect(type).toBeTruthy();
      expect(pdv).toBeTruthy();
      expect(atk).toBeTruthy();
      expect(cout).toBeTruthy();

      expect(nom.value).toStrictEqual('');
      expect(effet.value).toStrictEqual('');
      expect(description.value).toStrictEqual('');
      expect(type.value).toStrictEqual('');
      expect(pdv.value).toStrictEqual('');
      expect(atk.value).toStrictEqual('');
      expect(cout.value).toStrictEqual('');
      nom.setValue('1');
      effet.setValue('2');
      description.setValue('3');
      type.setValue('4');
      pdv.setValue('5');
      atk.setValue('6');
      cout.setValue('7');

      expect(nom.value).toStrictEqual('1');
      expect(effet.value).toStrictEqual('2');
      expect(description.value).toStrictEqual('3');
      expect(type.value).toStrictEqual('4');
      expect(pdv.value).toStrictEqual('5');
      expect(atk.value).toStrictEqual('6');
      expect(cout.value).toStrictEqual('7');
    });
  });
  describe('alertNotValid', () => {
    it('should alert', () => {
      let spy = vi.spyOn(window, 'alert');
      component.alertNotValid();
      expect(spy).toHaveBeenCalledExactlyOnceWith(
        'Veuillez renseigner un nom pour créer une carte',
      );
    });
  });
  describe('sendForm', () => {
    it('should fetch through post', async () => {
      const spy = vi.spyOn(component, 'post');
      await component.sendForm();
      expect(spy).toHaveBeenCalledOnce();
    });
  });
  describe('post', () => {
    it('should fetch', async () => {
      const spy = vi.spyOn(window, 'fetch');
      const formData = component.getFormData();
      const returnValue = await component.post(formData);
      expect(spy).toHaveBeenCalledWith(backEndUrl + 'ajouter', {
        method: 'POST',
        body: formData,
      });
    });
  });
  describe('ngOnInit', () => {
    it('should call sendGetRequest', () => {
      const spy = vi.spyOn(component, 'sendGetRequest');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});
