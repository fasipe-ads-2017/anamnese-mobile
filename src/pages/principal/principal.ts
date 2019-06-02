import { ListaUsuariosPage } from './../lista-usuarios/lista-usuarios';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Usuario } from './../../model/usuario.model';
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

  public usuario: Usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    this.usuario = this.navParams.get('usuario') || {};
  }

  sair() {
    this.usuarioProvider.removeUsuarioAutenticado();
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

  usuarios() {
    if (this.usuario.administrador) {
      this.navCtrl.push(ListaUsuariosPage);
    }
  }

}
