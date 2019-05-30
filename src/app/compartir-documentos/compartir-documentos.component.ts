import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';

declare let require: any;
const identitieschain_artifacts = require('../../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'app-compartir-documentos',
  templateUrl: './compartir-documentos.component.html',
  styleUrls: ['./compartir-documentos.component.css']
})
export class CompartirDocumentosComponent implements OnInit {

  IC: any;
  accounts: string[];
  hash: string;

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {this.hash = params['hash'];});
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);

    this.watchAccount();

    this.web3Service.artifactsToContract(identitieschain_artifacts)
      .then((ICAbstraction) => {
        this.IC = ICAbstraction;
        this.IC.deployed().then(deployed => {
          console.log("IC instanciado: "+deployed);
        });
      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  async compartirDoc(destinatario: string){
    try {

      let idPermiso = destinatario + "" + this.hash;

      console.log("destinatario: "+destinatario);
      console.log("hash: "+this.hash);
      console.log("idPermiso: "+idPermiso);



      const deployedIC = await this.IC.deployed();
      const iCTransaction = await deployedIC.compartir.sendTransaction(destinatario, this.hash, idPermiso, {from: this.model.account});


      if (!iCTransaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }
  }

  redireccion(){
    this.router.navigateByUrl(`${'menu'}/${this.model.account}`);
  }

}
