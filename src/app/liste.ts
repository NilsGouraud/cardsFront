import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { backEndUrl } from './app';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'liste',
  templateUrl: 'liste.html',
  imports: [NgOptimizedImage, ReactiveFormsModule],
})
export class liste {
  cards = signal<any[]>([]);
  constructor(private cd: ChangeDetectorRef) {}
  async sendGetRequest() {
    return await fetch(backEndUrl + 'liste')
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        this.cards.set(r);
        console.log(this.cards);
      });
  }
  file = '';
  hasSelection = false;
  selectedCard: any = '';
  async sendUpdateRequest() {
    let formData = this.getFormData();
    await fetch(backEndUrl + 'liste', { method: 'PUT', body: formData }).then((r) => r.text());
    return await this.sendGetRequest();
  }
  formulaire = new FormGroup({
    nom: new FormControl('', Validators.required),
    effet: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    atk: new FormControl(''),
    pdv: new FormControl(''),
    cout: new FormControl(''),
    id: new FormControl(''),
  });
  getFormData() {
    const formData = new FormData();
    const values = this.formulaire.value;
    console.log('logging the values');
    console.log(values);
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    formData.append('image', this.file);
    return formData;
  }
  async confirmChanges() {
    let nom = this.formulaire.value.nom;
    if (nom === '') {
      alert('Veuillez renseigner un nom pour la carte');
      return;
    }
    if (this.cards().some((c) => c.nom === nom && c.id !== this.selectedCard.id)) {
      alert('Nom déjà pris ; veuillez réessayer');
      return;
    }
    await this.sendUpdateRequest();
    this.hasSelection = false;
  }
  async ngOnInit() {
    this.formulaire.reset();
    await this.sendGetRequest();
    this.cd.detectChanges();
  }
  openInOverlay(id: string) {
    this.selectedCard = this.findById(id);
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
    this.hasSelection = true;
  }
  async closeOverlay() {
    this.hasSelection = false;
    this.selectedCard = '';
    await this.sendGetRequest();
    this.file = '';
    this.formulaire.reset();
  }
  getFile(event: any) {
    this.file = event.target.files[0];
  }
  findById(id: string) {
    return this.cards().find((c) => c.id === id);
  }
}
type carte = {
  id: string;
  nom: string;
  effet: string;
  description: string;
  atk: string;
  pdv: string;
  cout: string;
  image: string;
};
