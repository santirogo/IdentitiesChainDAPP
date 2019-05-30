import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { Documento } from '../../documento/Documento';
import {MatIconModule} from '@angular/material/icon';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare let require: any;
const identitieschain_artifacts = require('../../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'app-ver-docs',
  templateUrl: './ver-doc.component.html',
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['./ver-doc.component.css']
})
export class VerDocComponent implements OnInit {

  IC: any;
  accounts: string[];
  documento: Documento;
  doc: any = {};
  elementType : 'url' | 'canvas' | 'img' = 'url';

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  hash:any;

  constructor(private web3Service: Web3Service, private route: ActivatedRoute,private router: Router,config: NgbModalConfig, private modalService: NgbModal,) {
    console.log(web3Service);

    //route.params.subscribe(params => {this.key = params['key'];});
    console.log("const");
    route.params.subscribe(params => {this.hash = params['hash'];});
    this.documento = new Documento();
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);

    this.watchAccount();

    this.web3Service.artifactsToContract(identitieschain_artifacts)
      .then((ICAbstraction) => {
        if(ICAbstraction != null){
          console.log("Todo bien: "+ICAbstraction);
          this.IC = ICAbstraction;
          this.IC.deployed().then(deployed => {
            console.log(deployed);
            this.getDoc()
          });
        } else{

        }
      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  async getDoc(){

    console.log("GET DOC");
    try {
      const deployedIC = await this.IC.deployed();
      console.log(deployedIC);
      console.log('Account', this.model.account);
      var cedula :any={};
      var done: boolean =false;
      var event = deployedIC.Documentos((error, result)=> {
        if (!error)

            var data: any = result.returnValues[0];

            if (this.hash == data[2]) {
                this.doc.nombre = data[0];
                this.doc.url = data[1];
                this.doc.hash = data[2];
            }



      });

      const ICBalance = await deployedIC.getDocumentos.sendTransaction({from: this.model.account});
    } catch (e) {
      console.log(e);
      console.log('Error getting balance; see log.');
    }

  }

  openModal(content){
    this.modalService.open(content, { centered: true, size:'sm' });
  }

  redireccion(){
    this.router.navigateByUrl(`${'menu'}/${this.model.account}`);
  }
}
