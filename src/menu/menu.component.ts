import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Documento } from '../documento/Documento';
import {Web3Service} from '../app/util/web3.service';

declare let require: any;
const identitieschain_artifacts = require('../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  IC: any;
  public isCollapsed = true;
  adr:any;
  documentos: Documento[];
  accounts: string[];
  doc: any = {};

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service, private route: ActivatedRoute,private router: Router) {
    route.params.subscribe(params => {this.adr = params['adr'];});
    this.documentos = [];
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
    var cont = 0;
    console.log("GET DOC");
    try {
      const deployedIC = await this.IC.deployed();
      console.log(deployedIC);
      console.log('Account', this.model.account);
      var cedula :any={};
      var done: boolean =false;
      var event = deployedIC.Documentos((error, result)=> {
        if (!error)
            console.log("evento!!!!");
            console.log(result);
            var data: any = result.returnValues[0];
            console.log("DATA: ");
            //console.log(data);
            console.log(data[0]);
            //console.log(data.nombre);
            console.log(data[1]);
            //console.log(data.url);
            console.log(data[2]);
            //console.log(data.hash);

            this.doc.nombre = data[0];
            this.doc.url = data[1];
            this.doc.hash = data[2];

            console.log(this.doc.nombre);
            console.log(this.doc.url);
            console.log(this.doc.hash);

            this.documentos.push(this.doc);
            console.log(this.documentos);

            this.doc = {};
      });

      const ICBalance = await deployedIC.getDocumentos.sendTransaction({from: this.model.account});
    } catch (e) {
      console.log(e);
      console.log('Error getting balance; see log.');
    }

  }
}
