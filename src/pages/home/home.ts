import { EsqueciASenhaPage } from './../esqueci-a-senha/esqueci-a-senha';
import { PrincipalPage } from './../principal/principal';
import { Component, ViewChild } from '@angular/core';
import { NavController, TextInput } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('email') emailInput: TextInput;
  @ViewChild('senha') senhaInput: TextInput;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.emailInput.setFocus(), 100);
  }

  entrar() {
    this.navCtrl.setRoot(PrincipalPage)
  }

  esqueciASenha() {
    this.navCtrl.push(EsqueciASenhaPage);
  }
}
