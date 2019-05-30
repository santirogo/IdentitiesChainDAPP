import { Routes, RouterModule }  from '@angular/router';


import { AñadirDocumento } from './añadir-documento.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: AñadirDocumento,
    children: [
      //{ path: 'childview', component: ChildViewComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
// if it has child use routing below
//export const routing = RouterModule.forChild(routes);

