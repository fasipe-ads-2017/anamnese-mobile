import { PacienteCadastroPage } from './../paciente-cadastro/paciente-cadastro';
import { BuscarPacientePorCpfPage } from './../buscar-paciente-por-cpf/buscar-paciente-por-cpf';
import { BuscarPacientePorNomePage } from './../buscar-paciente-por-nome/buscar-paciente-por-nome';
import { BuscarPacientePage } from './../buscar-paciente/buscar-paciente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home'

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  sair() {
    this.navCtrl.setRoot(HomePage);
  }

  listarPacientes() {
    this.navCtrl.push(BuscarPacientePage);
  }

  buscarPorNome() {
    this.navCtrl.push(BuscarPacientePorNomePage);
  }

  buscarPorCpf() {
    this.navCtrl.push(BuscarPacientePorCpfPage);
  }

  novoPaciente() {
    this.navCtrl.push(PacienteCadastroPage);
  }

}
