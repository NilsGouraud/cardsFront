import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { backEndUrl } from './app';
@Component({
  selector: 'accueil',
  templateUrl: './accueil.html',
  styleUrl: './app.css',
})
export class Accueil implements OnChanges {
  text = 'placeholder';
  constructor(private cd: ChangeDetectorRef) {}
  async ngOnInit() {
    console.log('initializing home component');
    let buffer = await this.getData();
    console.log('the text has been changed');
    this.text = buffer;
    this.cd.detectChanges();
  }

  async getData() {
    let request = backEndUrl;
    let response = await fetch(request);
    let data = await response.text();
    return data;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      console.log('it changed');
    }
  }
  async handle() {
    console.log('event right there');
    let buffer = await this.getData();
    this.text = buffer;
  }
}
