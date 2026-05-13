import { Routes } from '@angular/router';
import { Accueil as Accueil } from './accueil';
import { Ajouter as Ajouter } from './ajouter';
import { Liste } from './liste';

let routeAccueil = {
  path: '',
  component: Accueil,
  title: 'Bienvenue',
};
let routeAjouter = {
  path: 'ajouter',
  component: Ajouter,
  title: 'Ajouter au catalogue',
};
let routeListe = {
  path: 'liste',
  component: Liste,
  title: 'Consulter notre catalogue',
};

export const routes: Routes = [routeAccueil, routeAjouter, routeListe];
