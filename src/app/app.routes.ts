import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { accueil } from './accueil';
import { ajouter} from './ajouter';
import { liste } from './liste';

let routeAccueil={
    path:"",
    component:accueil,
    title:"Bienvenue",
}
let routeAjouter={
    path:"ajouter",
    component:ajouter,
    title:"Ajouter au catalogue"
}
let routeListe={
    path:"liste",
    component:liste,
    title:"Consulter notre catalogue"
}

export const routes: Routes = [
    routeAccueil,routeAjouter,routeListe
];
