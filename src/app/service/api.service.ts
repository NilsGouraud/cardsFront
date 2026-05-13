import { Injectable } from '@angular/core';
import { backEndUrl } from '../app';
import { Carte } from '../models/carte.model';
@Injectable({ providedIn: 'root' })
export class ApiService {
  async getCards(): Promise<Carte[]> {
    try {
      const response = await fetch(backEndUrl + 'liste', { method: 'GET' });
      return response.json();
    } catch (e) {
      console.error(e, 'failed to get at' + backEndUrl + 'liste');
    }
    return [];
  }
  async updateCards(formData: FormData): Promise<void> {
    try {
      await fetch(backEndUrl + 'liste', { method: 'PUT', body: formData });
    } catch (e) {
      console.error(e, 'failed to put at' + backEndUrl + 'liste');
    }
  }
}
