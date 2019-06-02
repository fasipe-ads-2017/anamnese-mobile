import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Usuario } from './../../model/usuario.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CadastroUsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuarios',
  templateUrl: 'cadastro-usuarios.html',
})
export class CadastroUsuariosPage {

  usuario: Usuario = {};

  editar = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public mensagem: MensagemProvider,
    public usuarioProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    this.usuario = this.navParams.get('usuario');

    if (!this.usuario._id) {
      this.usuario.administrador = false;
      this.usuario.ativo = true;
    }
  }

  salvar() {
    const loader = this.loadingCtrl.create({
      content: 'Aguarde, salvando dados...'
    });

    loader.present();
    this.usuarioProvider.salvar(this.usuario)
      .subscribe((retorno) => {
        loader.dismiss();
        this.mensagem.showToast('Usuário salvo com sucesso!');
        this.voltar();
      }, (error) => {
        loader.dismiss();
        this.mensagem.errorWithResponse(error);
      });
  }

  voltar() {
    this.navCtrl.pop();
  }
}
