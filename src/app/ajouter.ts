import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { backEndUrl } from './app';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'ajouter',
  templateUrl: './ajouter.html',
  imports: [ReactiveFormsModule],
})
export class ajouter {
  confirmationRequired = false;
  isConfirmed = false;
  isUpdated = false;
  cards = [];
  serverLog = '';
  file = '';
  formulaire = new FormGroup({
    nom: new FormControl('carte', Validators.required),
    effet: new FormControl('valeurEffet'),
    description: new FormControl(''),
    type: new FormControl(''),
    atk: new FormControl(''),
    pdv: new FormControl(''),
    cout: new FormControl(''),
  });

  confirmOverwrite() {
    //TODO overwrite when isConfirmed
    this.isConfirmed = true;
    this.sendForm();
  }
  closeConfirmation() {
    this.confirmationRequired = false;
  }
  closeUpdate() {
    this.isUpdated = false;
  }

  async sendGetRequest() {
    return await fetch(backEndUrl + 'ajouter', { method: 'GET' })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        this.cards = r;
        console.log(this.cards);
      });
  }
  getFile(event: any) {
    this.file = event.target.files[0];
  }
  getFormData() {
    const formData = new FormData();
    const values = this.formulaire.value;

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    formData.append('image', this.file);
    // console.log('creating formData');
    // for (let [k, v] of formData.entries()) console.log(k, v);
    // console.log('formData is above');
    return formData;
  }

  async sendForm() {
    console.log(this.cards);
    if (
      !this.isConfirmed &&
      this.cards.some((card: carte) => card.nom === this.formulaire.value.nom)
    ) {
      console.log('card already exists; waiting for confirmation');
      this.confirmationRequired = true; //TODO: ask for confirmation
      return;
    }
    console.log('sending form');
    const formData = this.getFormData();
    this.isConfirmed = false;
    let res = await fetch(backEndUrl + 'ajouter', {
      method: 'POST',
      body: formData,
    }).then((r) => r.text());
    this.formulaire.reset();
    console.log('here is the result');
    console.log(res);
    this.isUpdated = true;
    this.serverLog = res;
    this.isUpdated = true;
  }
  ngOnInit() {
    this.sendGetRequest();
  }
  replaceLineBreaks(text: string) {
    return text.replace(/\n/g, '<br>');
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
