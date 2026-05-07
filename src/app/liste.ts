import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { backEndUrl } from './app';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'liste',
  templateUrl: 'liste.html',
  imports: [NgOptimizedImage],
  // imports: [CommonModule],
})
export class liste {
  cards = signal<any[]>([]);
  constructor(private cd: ChangeDetectorRef) {}
  async sendRequest() {
    return await fetch(backEndUrl + 'liste')
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        this.cards.set(r);
        console.log(this.cards);
      });
  }
  async sendUpdateRequest(card: carte) {
    return await fetch(backEndUrl + 'liste' + '/' + card.id)
      .then((r) => r.json())
      .then((r) => console.log(r));
  }
  async ngOnInit() {
    await this.sendRequest();
    this.cd.detectChanges();
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
