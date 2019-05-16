import { PacienteProvider } from './../../providers/paciente/paciente';
import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, TextInput } from 'ionic-angular';
import { Paciente } from '../../model/paciente.model';
import { PacientePreviewPage } from '../paciente-preview/paciente-preview';

@IonicPage()
@Component({
  selector: 'page-buscar-paciente-por-nome',
  templateUrl: 'buscar-paciente-por-nome.html',
})
export class BuscarPacientePorNomePage {

  nomePaciente: string = '';
  pageNumber: number = 1;
  pacientes: Paciente[];
  hasMore = false;

  @ViewChild('nomeInput') nomeInput: TextInput;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mensagem: MensagemProvider,
    public pacienteProvider: PacienteProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.nomeInput.setFocus(), 500);
  }

  buscar() {
    if (!this.nomePaciente || this.nomePaciente.length < 3) {
      this.mensagem.showToast('Informe pelo menos 3 dígitos para buscar!');
      return;
    }

    const loader = this.loadingCtrl.create({
      content: 'Aguarde, buscando...'
    });

    loader.present();

    this.pacienteProvider.buscarPorNome(this.nomePaciente, this.pageNumber)
      .subscribe((pacientes) => {
        loader.dismiss();

        this.pacientes = pacientes;
      }, (error) => {
        this.mensagem.errorWithResponse(error);
        loader.dismiss();
      });
  }

  visualizar(paciente: Paciente) {
    this.navCtrl.push(PacientePreviewPage, { paciente: paciente });
  }

  voltar() {
    this.navCtrl.pop();
  }

  novaBusca() {
    this.nomePaciente = '';
  }
}
