import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

/*for dev:
export const backEndUrl = 'http://localhost:8080/';

*/
export const backEndUrl = 'https://cardsback-young-bush-4086.fly.dev/';
