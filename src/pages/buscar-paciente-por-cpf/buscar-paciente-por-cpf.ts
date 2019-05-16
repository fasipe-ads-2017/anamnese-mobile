import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { PacienteProvider } from './../../providers/paciente/paciente';
import { PacientePreviewPage } from './../paciente-preview/paciente-preview';
import { Paciente } from './../../model/paciente.model';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buscar-paciente-por-cpf',
  templateUrl: 'buscar-paciente-por-cpf.html',
})
export class BuscarPacientePorCpfPage {

  cpfPaciente: string = '';
  mensagemErro: string = '';
  // paciente: Paciente = undefined;

  showFoto = false;

  @ViewChild('cpfInput') cpfInput: TextInput;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pacienteProvider: PacienteProvider,
    public mensagem: MensagemProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.cpfInput.setFocus(), 200);
  }

  buscar() {
    this.showFoto = false;

    this.mensagemErro = '';

    if (!this.cpfPaciente || this.cpfPaciente.length < 11) {
      this.mensagem.showToast('Informe os 11 dígitos do CPF!');
      return;
    } else if (this.cpfPaciente.length > 11) {
      this.cpfPaciente = this.cpfPaciente.substr(0, 11);
    }

    const loader = this.loadingCtrl.create({
      content: 'Aguarde, buscando...'
    });
    loader.present();

    this.pacienteProvider.buscarPorCpf(this.cpfPaciente)
      .subscribe((paciente) => {
        this.visualizar(paciente);
        loader.dismiss();
      }, (error) => {
        this.mensagem.errorWithResponse(error);
        loader.dismiss();
      });
  }

  visualizar(paciente: Paciente) {
    // this.paciente = paciente;
    this.navCtrl.push(PacientePreviewPage, { paciente: paciente });
  }

  voltar() {
    this.navCtrl.pop();
  }

  historico() {

  }

  novaAnamnese() {

  }

  novaBusca() {
    this.showFoto = false;
    this.mensagemErro = '';
    this.cpfPaciente = '';
    this.cpfInput.setFocus();
  }
}
