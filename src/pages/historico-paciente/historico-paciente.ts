import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { FormularioProvider } from './../../providers/formulario/formulario';
import { Paciente } from './../../model/paciente.model';
import { FormularioPage } from './../formulario/formulario';
import { Formulario } from './../../model/formulario.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the HistoricoPacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-paciente',
  templateUrl: 'historico-paciente.html',
})
export class HistoricoPacientePage {

  formularios: Formulario[] = [];
  paciente: Paciente;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public mensagem: MensagemProvider,
    public formularioProvider: FormularioProvider) {
  }

  ionViewDidLoad() {
    this.paciente = this.navParams.get('paciente');

    if (this.paciente) {
      const loader = this.loadingCtrl.create({
        content: 'Aguarde, buscando...'
      });

      loader.present();

      this.formularioProvider
        .buscarPorPaciente(this.paciente)
        .subscribe((formularios) => {

          console.log(formularios);

          loader.dismiss();
          this.formularios = formularios;
        }, (error) => {
          loader.dismiss();
          this.mensagem.errorWithResponse(error);
        });
    }
  }

  visualizar(formulario: Formulario) {
    this.navCtrl.push(FormularioPage, { paciente: this.paciente, formulario: formulario, somenteLeitura: true })
  }

  voltar() {
    this.navCtrl.pop();
  }
}
