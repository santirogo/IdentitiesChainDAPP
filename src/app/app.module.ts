import { CedulaComponent } from './../nueva-cedula/nuevacedula.component';
import { DocumentoComponent } from './../documento/documento.component';
import { VisualizadorDocumento } from './visualizador-documento/visualizador-documento.component';
import { MenuComponent } from './../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { NuevoDocComponent } from '../nuevo-doc/nuevodoc.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UtilModule } from './util/util.module';
import {MatIconModule} from '@angular/material/icon'

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegistryComponent } from '../registry/registry.component';
import { AñadirDocumento } from './añadir-documento';
import { VerDocComponent } from './ver-doc/ver-doc.component';
import { CompartirDocumentosComponent } from './compartir-documentos/compartir-documentos.component';
import { PermisosComponent } from './permisos/permisos.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [
    AppComponent, VisualizadorDocumento, AñadirDocumento, DocumentoComponent, CedulaComponent, routingComponents, VerDocComponent, NuevoDocComponent, CompartirDocumentosComponent, PermisosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, NgbModule, MatNativeDateModule, MatDatepickerModule,
    MatSelectModule,
    UtilModule,
    MatIconModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
