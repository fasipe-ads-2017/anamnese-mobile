import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { PacienteProvider } from './../../providers/paciente/paciente';
import { Foto } from './../../model/paciente.model';
import { FormularioPage } from './../formulario/formulario';
import { HistoricoPacientePage } from './../historico-paciente/historico-paciente';
import { PacienteCadastroPage } from './../paciente-cadastro/paciente-cadastro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paciente } from '../../model/paciente.model';

@IonicPage()
@Component({
  selector: 'page-paciente-preview',
  templateUrl: 'paciente-preview.html',
})
export class PacientePreviewPage {
  paciente: Paciente = {};

  showFoto = false;
  foto: Foto = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pacienteProvider: PacienteProvider,
    public mensagem: MensagemProvider) {
  }

  ionViewDidLoad() {
    let paciente = this.navParams.get('paciente');

    if (paciente) {
      this.paciente = paciente;
    }
  }

  editar() {
    if (this.paciente) {
      this.navCtrl.push(PacienteCadastroPage, { paciente: this.paciente })
    }
  }

  historico() {
    if (this.paciente) {
      this.navCtrl.push(HistoricoPacientePage, { paciente: this.paciente })
    }
  }

  novaAnamnese() {
    if (this.paciente) {
      this.navCtrl.push(FormularioPage, { paciente: this.paciente })
    }
  }

  voltar() {
    this.navCtrl.pop();
  }

  toogleFoto() {
    this.showFoto = !this.showFoto;

    if (this.showFoto) {
      this.pacienteProvider.buscarFoto(this.paciente)
        .subscribe((foto) => this.foto = foto, (error) => {
          if (error.status != 404) {
            this.mensagem.errorWithResponse(error);
          }
        });
    } else {
      this.foto = {};
    }
  }
}
