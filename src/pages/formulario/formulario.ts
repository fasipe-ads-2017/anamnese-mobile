import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { FormularioProvider } from './../../providers/formulario/formulario';
import { FormatUtils } from './../../utils/format-utils';
import { CurrencyUtils } from './../../utils/currency-utils';
import { Formulario } from './../../model/formulario.model';
import { Paciente } from './../../model/paciente.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  paciente: Paciente;
  formulario: Formulario = {};
  isNovo = false;

  step = 1;
  maxSteps = 4;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public currencyUtils: CurrencyUtils,
    public formularioProvider: FormularioProvider,
    public mensagem: MensagemProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.paciente = this.navParams.get('paciente');
    this.formulario = this.navParams.get('formulario') || {};

    this.isNovo = !(this.formulario._id);

    this.prepareData(this.formulario);
  }

  prepareData(formulario: Formulario) {
    formulario.pressaoArterialString = FormatUtils.formatNumberOneDigit(this.formulario.pressaoArterial);
    formulario.frequenciaCardiacaString = FormatUtils.formatNumberOneDigit(this.formulario.frequenciaCardiaca);
    formulario.frequenciaRespiratoriaString = FormatUtils.formatNumberOneDigit(this.formulario.frequenciaRespiratoria);
    formulario.temperaturaString = FormatUtils.formatNumberOneDigit(this.formulario.temperatura);
  }

  voltar() {
    this.navCtrl.pop();
  }

  salvar() {

    if (!this.formulario._idPaciente) {
      this.formulario._idPaciente = this.paciente._id;
    }

    const loader = this.loadingCtrl.create({
      content: 'Aguarde, salvando dados...'
    });

    loader.present();

    this.formularioProvider.salvarFormulario(this.formulario)
      .subscribe(() => {
        loader.dismiss();
        this.mensagem.showToast('Formulário salvo com sucesso!');
        this.voltar();
      }, (error) => {
        loader.dismiss();
        this.mensagem.errorWithResponse(error);
      });
  }

  avancar() {
    if (this.step < this.maxSteps) {
      this.step++;
    }
  }

  anterior() {
    if (this.step > 1) {
      this.step--;
    }
  }

  keyUpPressaoArterial() {
    this.formulario.pressaoArterialString = this.currencyUtils.detectAmount(this.formulario.pressaoArterialString);
    this.formulario.pressaoArterialString = this.formulario.pressaoArterialString || '';
    this.formulario.pressaoArterial = parseFloat(this.formulario.pressaoArterialString.replace(',', '.'));
  }

  keyUpFrequenciaCardiaca() {
    this.formulario.frequenciaCardiacaString = this.currencyUtils.detectAmount(this.formulario.frequenciaCardiacaString);
    this.formulario.frequenciaCardiacaString = this.formulario.frequenciaCardiacaString || '';
    this.formulario.frequenciaCardiaca = parseFloat(this.formulario.frequenciaCardiacaString.replace(',', '.'));
  }

  keyUpFrequenciaRespiratoria() {
    this.formulario.frequenciaRespiratoriaString = this.currencyUtils.detectAmount(this.formulario.frequenciaRespiratoriaString);
    this.formulario.frequenciaRespiratoriaString = this.formulario.frequenciaRespiratoriaString || '';
    this.formulario.frequenciaRespiratoria = parseFloat(this.formulario.frequenciaRespiratoriaString.replace(',', '.'));
  }

  keyUpTemperatura() {
    this.formulario.temperaturaString = this.currencyUtils.detectAmount(this.formulario.temperaturaString);
    this.formulario.temperaturaString = this.formulario.temperaturaString || '';
    this.formulario.temperatura = parseFloat(this.formulario.temperaturaString.replace(',', '.'));
  }
}
