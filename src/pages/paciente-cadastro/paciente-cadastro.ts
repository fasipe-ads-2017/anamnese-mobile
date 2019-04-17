import { Paciente } from './../../model/paciente.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the PacienteCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paciente-cadastro',
  templateUrl: 'paciente-cadastro.html',
})
export class PacienteCadastroPage {

  paciente: Paciente = {};

  editar = false;

  ufs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastr: ToastController
    ) {
    let paciente = this.navParams.get('paciente');
    let cpf: string = this.navParams.get('cpf');
    this.paciente = paciente || {};

    // Cadastro de um novo paciente
    if (!paciente && cpf && cpf.length > 11) {
      this.paciente.cpf = cpf;
    }

    this.editar = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacienteCadastroPage');
  }

  buscarCep() {
    //
  }

  salvar() {
    // TODO: Implementar Service
    this.voltar();
  }

  voltar() {
    this.navCtrl.pop();
  }
}
