import { VisualizadorDocumento } from './visualizador-documento/visualizador-documento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AñadirDocumento } from './añadir-documento';

import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';
import { RegistryComponent } from '../registry/registry.component';
import {CedulaComponent} from '../nueva-cedula/nuevacedula.component';
import { DocumentoComponent } from '../documento/documento.component';
import { NuevoDocComponent } from '../nuevo-doc/nuevodoc.component';
import { VerDocComponent } from './ver-doc/ver-doc.component';
import { PermisosComponent } from './permisos/permisos.component';
import { CompartirDocumentosComponent } from './compartir-documentos/compartir-documentos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu/:adr', component: MenuComponent },
  { path: 'registry', component: RegistryComponent },
  {path : 'nueva-cedula/:key/:adr', component : CedulaComponent},
  {path: 'aniadirdocumento', component : AñadirDocumento},
  {path: 'verdocumento/:adr', component : VisualizadorDocumento},
  {path: 'documento/:adr', component : DocumentoComponent},
  {path: 'generardocumento', component : NuevoDocComponent},
  {path: 'mostrardocumento/:hash', component : VerDocComponent},
  {path: 'compartirdocumento/:hash', component : CompartirDocumentosComponent},
  {path: 'permisos', component : PermisosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, MenuComponent, RegistryComponent ]
