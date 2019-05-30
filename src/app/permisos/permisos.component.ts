import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permiso } from './Permiso';
import {Documento} from '../../documento/Documento';

declare let require: any;
const identitieschain_artifacts = require('../../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  IC: any;
  accounts: string[];
  permisos: Permiso[];

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service, private route: ActivatedRoute, private router: Router) {
    this.permisos = [];
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
          this.verPermisos();
        });
      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  async verPermisos(){
    try {
      const deployedIC = await this.IC.deployed();
      console.log(deployedIC);
      console.log('Account', this.model.account);
      var event = deployedIC.Permisos((error, result)=> {
        if (!error)
            console.log("evento!!!!");
            console.log(result);
            var data: any = result.returnValues[0];
            console.log("DATA: ");

            let permiso = new Permiso();

            let doc = new Documento();

            doc.nombre = data[0].docs[0].nombre;
            doc.url = data[0].docs[0].url;
            doc.hash = data[0].docs[0].hash;

            permiso.documentos.push(doc);
            permiso.duenio = data[0].duenio;

            this.permisos.push(permiso);

            console.log(permiso.documentos.length);

            console.log(this.permisos[0].documentos[0].nombre);
            console.log(this.permisos[0].documentos[0].url);
            console.log(this.permisos[0].documentos[0].hash);
            console.log(this.permisos[0].duenio);
      });

      const ICBalance = await deployedIC.getPermisos.sendTransaction({from: this.model.account});
      console.log("ICBalance",ICBalance);


    } catch (e) {
      console.log(e);
      console.log('Error getting balance; see log.');
    }
  }

}
