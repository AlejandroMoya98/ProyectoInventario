import { Routes } from '@angular/router';
import { ModificarInventarioComponent } from './modificar-inventario/modificar-inventario.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modificar-inventario', component: ModificarInventarioComponent }
];
