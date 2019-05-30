import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { routing }      from './añadir-documento.routing';

// This Module's Components
import { AñadirDocumento } from './añadir-documento.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        AñadirDocumento
    ],
    exports: [
        AñadirDocumento
    ]
})
export class AñadirDocumentoModule {

}
