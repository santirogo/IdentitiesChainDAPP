import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit{
  adr:any;
  constructor(private router: Router, private route: ActivatedRoute) { 
    route.params.subscribe(params => {this.adr = params['adr'];});
  }

  ngOnInit():void {
  }

  fetchRowData(rowVal) {
    console.log("aeafasfasfasf");
    console.log(rowVal);

    //let route = this.router.config.find(r => r.path === 'nueva-cedula/:key');
    //route.data =  rowVal;

  // START: One way of using routerLink
   this.router.navigateByUrl(`${'nueva-cedula'}/${rowVal}/${this.adr}`);
   // Uncomment this line and check the result
  // END: One way of using routerLink */

   // ---- START: Another way of using routerLink
  // this.router.navigate(['app-customer-details/' + rowVal.id]);
  // ---- END: Another way of using routerLink

  };


}
