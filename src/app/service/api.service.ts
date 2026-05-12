import { Injectable } from '@angular/core';
import { backEndUrl } from '../app';
import { Carte } from '../models/carte.model';
@Injectable({ providedIn: 'root' })
export class ApiService {
  async getCards(): Promise<Carte[]> {
    const response = await fetch(backEndUrl + 'liste', { method: 'GET' });
    return response.json();
  }
  async updateCards(formData: FormData) {}
}
