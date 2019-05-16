import { PacienteCadastroPage } from './../paciente-cadastro/paciente-cadastro';
import { BuscarPacientePorCpfPage } from './../buscar-paciente-por-cpf/buscar-paciente-por-cpf';
import { BuscarPacientePorNomePage } from './../buscar-paciente-por-nome/buscar-paciente-por-nome';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buscar-paciente',
  templateUrl: 'buscar-paciente.html',
})
export class BuscarPacientePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

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

  voltar() {
    this.navCtrl.pop();
  }
}
