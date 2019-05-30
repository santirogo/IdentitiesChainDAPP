import { ActivatedRoute } from '@angular/router';
import { documento } from './visualizador-documento.component';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';

export interface documento {
  key: string,
  nombre: string,
  fecha: string,
  //gs: string,
  //rh: string,
  departamento: string,
  ciudad: string,
  sexo: string
}

declare let require: any;
const identitieschain_artifacts = require('../../../build/contracts/IdentitiesChain.json');

@Component({
    selector: 'visualizador-documento',
    templateUrl: 'visualizador-documento.html',
    styleUrls: ['visualizador-documento.css']
})

export class VisualizadorDocumento implements OnInit {

  IC: any;
  accounts: string[];

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  //private key:string;
  doc: any = {};
  documentos: documento[];
  adr:any;
  constructor(private web3Service: Web3Service, private route: ActivatedRoute) {
    console.log(web3Service);
    //route.params.subscribe(params => {this.key = params['key'];});
    console.log("const");
    route.params.subscribe(params => {this.adr = params['adr'];});
  }

  ngOnInit(): void {
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
          console.log("Vamos al DOC");
        } else{
          console.log("ESTAMOS JODIDOS");
        }
      });
    console.log("Terminando OnInit");
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
      var event = deployedIC.Cedulita((error, result)=> {
        if (!error)
            console.log("evento!!!!");
            console.log(result);

            this.doc.nombre = result.returnValues[0];
            this.doc.fecha = result.returnValues[1];
            this.doc.sexo = result.returnValues[2];
            this.doc.ciudad = result.returnValues[3];
            this.doc.dep = result.returnValues[4];

            console.log(this.doc.nombre);
            console.log(this.doc.fecha);
            console.log(this.doc.sexo);
            console.log(this.doc.ciudad);
            console.log(this.doc.dep);
      });
      const ICBalance = await deployedIC.getCedula.sendTransaction(this.adr, {from: this.model.account});
    } catch (e) {
      console.log(e);
      console.log('Error getting balance; see log.');
    }
    /*this.doc.fecha = event.returnValues[1];
    this.doc.sexo = event.returnValues[2];
    this.doc.ciudad = event.returnValues[3];
    this.doc.dep = event.returnValues[4];*/
  }
}
