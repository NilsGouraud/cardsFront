import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Carte } from './models/carte.model';
import { ApiService } from './service/api.service';
import { CarteForm } from './interfaces/carteForm.interface';
@Component({
  standalone: true,
  selector: 'liste',
  templateUrl: 'liste.html',
  imports: [NgOptimizedImage, ReactiveFormsModule],
})
export class Liste implements OnInit {
  async deleteCard() {
    await this.apiService.deleteCard(this.selectedCard!.id);
    await this.closeOverlay();
  }
  readonly cards = signal<Carte[]>([]);
  file: File | null = null;
  selectedCard: Carte | null = null;
  readonly formulaire = this.initForm();
  private readonly apiService = inject(ApiService);

  public async ngOnInit() {
    this.formulaire.reset();
    await this.sendGetRequest();
  }

  public async confirmChanges(): Promise<void> {
    const nom = this.formulaire.value.nom;
    if (nom === '') {
      alert('Veuillez renseigner un nom pour la carte');
      return;
    }
    if (this.cards().some((c) => c.nom === nom && c.id !== this.selectedCard?.id)) {
      alert('Nom déjà pris ; veuillez réessayer');
      return;
    }
    await this.sendUpdateRequest();
    await this.closeOverlay();
  }

  public openInOverlay(id: string) {
    this.selectedCard = this.findById(id);
    if (!this.selectedCard) return;
    this.formulaire.patchValue({
      nom: this.selectedCard.nom,
      effet: this.selectedCard.effet == 'N/A' ? '' : this.selectedCard.effet,
      description: this.selectedCard.description == 'N/A' ? '' : this.selectedCard.description,
      type: this.selectedCard.type,
      atk: this.selectedCard.atk,
      pdv: this.selectedCard.pdv,
      cout: this.selectedCard.cout,
      id: this.selectedCard.id,
    });
  }
  public async closeOverlay() {
    this.selectedCard = null;
    this.file = null;
    await this.sendGetRequest();
    this.formulaire.reset();
  }
  public setFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] ?? null;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.selectedCard) this.closeOverlay();
  }

  @HostListener('document:keydown.enter')
  onEnter() {
    if (this.selectedCard) this.confirmChanges();
  }

  private async sendGetRequest(): Promise<void> {
    this.cards.set(await this.apiService.getCards());
  }
  private async sendUpdateRequest(): Promise<void> {
    await this.apiService.updateCards(this.getFormContent());
    await this.sendGetRequest();
  }

  private getFormContent(): FormData {
    const formData = new FormData();
    const values = this.formulaire.getRawValue();
    // console.log('logging the values');
    // console.log(values);
    Object.entries(values).forEach(([key, value]) => {
      if (value != undefined && value != null && value != 'N/A') {
        console.log(key + ' ' + value);
        formData.append(key, value.toString());
      }
    });
    if (this.file) formData.append('image', this.file);
    return formData;
  }

  private findById(id: string): Carte | null {
    return this.cards().find((c) => c.id === id) ?? null;
  }
  private initForm(): FormGroup<CarteForm> {
    return new FormGroup<CarteForm>({
      nom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      effet: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      type: new FormControl('', { nonNullable: true }),
      atk: new FormControl('', { nonNullable: true }),
      pdv: new FormControl('', { nonNullable: true }),
      cout: new FormControl('', { nonNullable: true }),
      id: new FormControl('', { nonNullable: true }),
    });
  }
}
