import { CepProvider } from './../../providers/cep/cep';
import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { PacienteProvider } from './../../providers/paciente/paciente';
import { Paciente, Foto } from './../../model/paciente.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  foto: Foto = {};
  hasFotoChanged = false;

  editar = false;

  ufs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastr: ToastController,
    public camera: Camera,
    public pacienteProvider: PacienteProvider,
    public cepProvider: CepProvider,
    public mensagem: MensagemProvider,
    public loadingCtrl: LoadingController
  ) {
    let paciente = this.navParams.get('paciente');
    let cpf: string = this.navParams.get('cpf');
    this.paciente = paciente || {};

    // Cadastro de um novo paciente
    if (!paciente && cpf && cpf.length > 11) {
      this.paciente.cpf = cpf;
    }

    if (paciente) {
      // Buscar foto
      this.pacienteProvider.buscarFoto(paciente)
        .subscribe((foto) => this.foto = foto, (error) => {
          if (error.status != 404) {
            this.mensagem.errorWithResponse(error);
          }
        });
    }

    this.editar = true;
  }

  ionViewDidLoad() {
    this.hasFotoChanged = false;
  }

  buscarCep() {
    const loader = this.loadingCtrl.create({
      content: 'Aguarde, buscando...'
    });

    loader.present();

    this.cepProvider.buscarEndereco(this.paciente.cep)
      .subscribe((endereco) => {
        loader.dismiss();

        this.paciente.endereco = endereco.logradouro;
        this.paciente.bairro = endereco.bairro;
        this.paciente.cidade = endereco.localidade;
        this.paciente.uf = endereco.uf;

      }, (error) => {
        loader.dismiss();
        this.mensagem.errorWithResponse(error);
      });
  }

  salvar() {
    const loader = this.loadingCtrl.create({
      content: 'Aguarde, salvando dados...'
    });

    loader.present();

    if (this.paciente._id) {
      this.pacienteProvider
        .atualizar(this.paciente)
        .subscribe(() => {

          // Se mudou a foto, atualiza...
          if (this.hasFotoChanged) {

            this.pacienteProvider.atualizarFoto(this.paciente, this.foto.foto)
              .subscribe(() => {
                loader.dismiss();
                this.mensagem.showToast('Paciente atualizado com sucesso!');
                this.voltar();
              }, (error) => {
                loader.dismiss();
                this.mensagem.errorWithResponse(error);
              });
          } else {
            loader.dismiss();
            this.mensagem.showToast('Paciente atualizado com sucesso!');
            this.voltar();
          }
        }, (error) => {
          loader.dismiss();
          this.mensagem.errorWithResponse(error);
        });
    } else {
      this.pacienteProvider
        .inserir(this.paciente)
        .subscribe((data) => {

          // Recebe o Id inserido.
          this.paciente._id = data._id;

          // Atualiza a foto.
          this.pacienteProvider.atualizarFoto(this.paciente, this.foto.foto)
            .subscribe(() => {
              loader.dismiss();
              this.mensagem.showToast('Paciente inserido com sucesso!');
              this.voltar();
            }, (error) => {
              loader.dismiss();
              this.mensagem.errorWithResponse(error);
            });

        }, (error) => {
          loader.dismiss();
          this.mensagem.errorWithResponse(error);
        });
    }
  }

  voltar() {
    this.navCtrl.pop();
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.foto.foto = base64Image;
      this.hasFotoChanged = true;
    }, (err) => {
      this.toastr.create({
        message: 'Erro ao tirar foto',
        closeButtonText: 'Fechar',
        duration: 1000
      }).present();

      console.error(err);
    });
  }

  limparFoto() {
    if (this.foto.foto) {
      this.foto.foto = '';
      this.hasFotoChanged = true;
    }
  }
}
