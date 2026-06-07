import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { backEndUrl } from './app';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'ajouter',
  templateUrl: './ajouter.html',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class Ajouter {
  confirmationRequired = false;
  isConfirmed = false;
  hasBeenUpdated = false;
  cards: carte[] = [];
  serverLog = '';
  file = '';
  formulaire = new FormGroup({
    nom: new FormControl('', Validators.required),
    effet: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    atk: new FormControl(''),
    pdv: new FormControl(''),
    cout: new FormControl(''),
  });

  confirmOverwrite() {
    this.isConfirmed = true;
    this.sendForm();
  }
  closeConfirmation() {
    this.confirmationRequired = false;
  }
  closeUpdate() {
    this.hasBeenUpdated = false;
  }

  async sendGetRequest(): Promise<carte[]> {
    return await fetch(backEndUrl + 'ajouter', { method: 'GET' })
      .then((r) => r.json())
      .then((r) => {
        this.cards = r;
        return this.cards;
      });
  }
  getFile(event: any) {
    this.file = event.target.files[0];
  }
  getFormData() {
    const formData = new FormData();
    const values = this.formulaire.value;

    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined) return;
      if (value === null) return;
      if (value === '') return;
      formData.append(key, value);
    });
    formData.append('image', this.file);
    return formData;
  }
  alertNotValid() {
    alert('Veuillez renseigner un nom pour créer une carte');
  }
  async sendForm() {
    console.log(this.cards);
    if (
      !this.isConfirmed &&
      this.cards.some((card: carte) => card.nom === this.formulaire.value.nom)
    ) {
      this.confirmationRequired = true;
      return;
    }
    this.serverLog = await this.post(this.getFormData());
    this.formulaire.reset();
    this.hasBeenUpdated = true;
    this.isConfirmed = false;
    this.confirmationRequired = false;
  }
  async post(formData: FormData) {
    let response = await fetch(backEndUrl + 'ajouter', {
      method: 'POST',
      body: formData,
    }).then((r) => r.text());
    return response;
  }
  ngOnInit() {
    this.sendGetRequest();
  }
  /*unused
  replaceLineBreaks(text: string) {
    return text.replace(/\n/g, '<br>');
  }*/
}
type carte = {
  id?: string;
  nom: string;
  effet?: string;
  description?: string;
  atk?: string;
  pdv?: string;
  cout?: string;
  image?: string;
};
