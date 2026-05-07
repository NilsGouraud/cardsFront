import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { backEndUrl } from './app';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'ajouter',
  templateUrl: './ajouter.html',
  imports: [ReactiveFormsModule],
})
export class ajouter {
  formulaire = new FormGroup({
    nom: new FormControl('carte', Validators.required),
    effet: new FormControl('valeurEffet'),
    description: new FormControl(''),
    type: new FormControl(''),
    atk: new FormControl(''),
    pdv: new FormControl(''),
    cout: new FormControl(''),
  });
  file = '';
  async sendRequest() {
    let result = await fetch(backEndUrl + 'ajouter', {
      method: 'GET',
    });
    console.log(result);
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    console.log('-----');
    console.log(this.file);
    console.log('-----');
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
    console.log('sending form');
    const formData = this.getFormData();
    let res = await fetch(backEndUrl + 'ajouter', {
      method: 'POST',
      body: formData,
    });
    console.log('here is the result');
    console.log(res);
  }
  ngOnInit() {}
  log() {
    console.log('logging...');
  }
}
