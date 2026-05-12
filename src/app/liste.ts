import { Component, signal } from '@angular/core';
import { backEndUrl } from './app';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Carte } from './models/carte.model';

@Component({
  standalone: true,
  selector: 'liste',
  templateUrl: 'liste.html',
  imports: [NgOptimizedImage, ReactiveFormsModule],
})
export class liste {
  cards = signal<Carte[]>([]);
  file: File | null = null;
  selectedCard: Carte | null = null;
  readonly formulaire = new FormGroup<CarteForm>({
    nom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    effet: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
    atk: new FormControl('', { nonNullable: true }),
    pdv: new FormControl('', { nonNullable: true }),
    cout: new FormControl('', { nonNullable: true }),
    id: new FormControl('', { nonNullable: true }),
  });

  async sendGetRequest(): Promise<void> {
    try {
      const r = await fetch(backEndUrl + 'liste');
      const data: Carte[] = await r.json();
      this.cards.set(data);
    } catch (e) {
      console.error(`failed to get at ${backEndUrl}/liste`, e);
    }
  }
  async sendUpdateRequest(): Promise<void> {
    let formData = this.getFormContent();
    try {
      await fetch(backEndUrl + 'liste', { method: 'PUT', body: formData });
      await this.sendGetRequest();
    } catch (e) {
      console.error(`failed to put at ${backEndUrl}/liste`);
    }
  }

  getFormContent(): FormData {
    const formData = new FormData();
    const values = this.formulaire.getRawValue();
    console.log('logging the values');
    console.log(values);
    Object.entries(values).forEach(([key, value]) => {
      if (value != null) {
        formData.append(key, value.toString());
      }
    });
    if (this.file) formData.append('image', this.file);
    return formData;
  }
  async confirmChanges(): Promise<void> {
    let nom = this.formulaire.value.nom;
    if (nom === '') {
      alert('Veuillez renseigner un nom pour la carte');
      return;
    }
    if (this.cards().some((c) => c.nom === nom && c.id !== this.selectedCard?.id)) {
      alert('Nom déjà pris ; veuillez réessayer');
      return;
    }
    await this.sendUpdateRequest();
    this.selectedCard = null;
  }
  async ngOnInit() {
    this.formulaire.reset();
    await this.sendGetRequest();
  }
  openInOverlay(id: string) {
    this.selectedCard = this.findById(id);
    if (!this.selectedCard) return;
    this.formulaire.patchValue({
      nom: this.selectedCard.nom,
      effet: this.selectedCard.effet,
      description: this.selectedCard.description,
      type: this.selectedCard.type,
      atk: this.selectedCard.atk,
      pdv: this.selectedCard.pdv,
      cout: this.selectedCard.cout,
      id: this.selectedCard.id,
    });
  }
  async closeOverlay() {
    this.selectedCard = null;
    await this.sendGetRequest();
    this.file = null;
    this.formulaire.reset();
  }
  setFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] ?? null;
  }
  findById(id: string): Carte | null {
    return this.cards().find((c) => c.id === id) ?? null;
  }
}

interface CarteForm {
  nom: FormControl<string>;
  effet: FormControl<string>;
  description: FormControl<string>;
  type: FormControl<string>;
  atk: FormControl<string>;
  pdv: FormControl<string>;
  cout: FormControl<string>;
  id: FormControl<string>;
}
