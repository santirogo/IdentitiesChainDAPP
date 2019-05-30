import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Web3Service } from '../app/util/web3.service';

declare let require: any;
const identitieschain_artifacts = require('../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  IC: any;
  accounts: string[];

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service, config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
    console.log(web3Service);
  }

  ngOnInit():void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();

    this.web3Service.artifactsToContract(identitieschain_artifacts)
      .then((ICAbstraction) => {
        this.IC = ICAbstraction;
        this.IC.deployed().then(deployed => {
          console.log(deployed);
        });
      });
  }

  async logIn(user: string, password: string, content){
    var flag = false;

    console.log("account!!!!!!!!!: ",this.model.account);

    try {
      const deployedIC = await this.IC.deployed();
      const iCTransaction = await deployedIC.iniciarSesion.sendTransaction(user, password, {from: this.model.account});
      console.log("flag login: ");
      console.log(iCTransaction);

      flag = iCTransaction;

      if (!iCTransaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
        this.router.navigateByUrl(`${'../menu'}`);
      }
    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }

    if(flag == false){
      this.modalService.open(content, { centered: true, size:'sm' });
    }
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }
}
