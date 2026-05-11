import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { backEndUrl } from './app';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
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
  });
  getFormData() {
    const formData = new FormData();
    const values = this.formulaire.value;
    console.log(values);
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    formData.append('image', this.file);
    return formData;
  }
  confirmChanges() {
    let formNom = document.getElementById('inputNom') as HTMLInputElement;
    if (formNom == null) return;
    if (formNom.value === '') {
      alert('Veuillez renseigner un nom pour créer une carte');
      return;
    }
    this.sendUpdateRequest();
    this.hasSelection = false;
  }
  async ngOnInit() {
    this.formulaire.reset();
    await this.sendGetRequest();
    this.cd.detectChanges();
  }
  openInOverlay(id: string) {
    this.selectedCard = this.findById(id);
    this.formulaire = new FormGroup({
      nom: new FormControl(this.selectedCard.nom, Validators.required),
      effet: new FormControl(this.selectedCard.effet),
      description: new FormControl(this.selectedCard.description),
      type: new FormControl(this.selectedCard.type),
      atk: new FormControl(this.selectedCard.atk),
      pdv: new FormControl(this.selectedCard.pdv),
      cout: new FormControl(this.selectedCard.cout),
    });
    this.hasSelection = true;
  }
  async closeOverlay() {
    this.hasSelection = false;
    this.selectedCard = '';
    await this.sendGetRequest();
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
