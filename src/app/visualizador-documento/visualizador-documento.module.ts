import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { routing }      from './visualizador-documento.routing';

// This Module's Components
import { VisualizadorDocumento } from './visualizador-documento.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        VisualizadorDocumento
    ],
    exports: [
        VisualizadorDocumento
    ]
})
export class VisualizadorDocumentoModule {

}
