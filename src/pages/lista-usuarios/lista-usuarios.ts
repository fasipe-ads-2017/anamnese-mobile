import { CadastroUsuariosPage } from './../cadastro-usuarios/cadastro-usuarios';
import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { Usuario } from './../../model/usuario.model';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ListaUsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-usuarios',
  templateUrl: 'lista-usuarios.html',
})
export class ListaUsuariosPage {

  usuarios: Usuario[] = [];
  hasMore: boolean = false;
  nextPage: number = 1;
  nomeUsuario: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioProvider: UsuarioProvider,
    public msg: MensagemProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.buscar(true);
  }

  buscar(refresh = false) {
    const loader = this.loadingCtrl.create({
      content: 'Aguarde, buscando...'
    });

    loader.present();

    this.nextPage = refresh ? 1 : this.nextPage;

    this.usuarioProvider.listar(this.nomeUsuario, this.nextPage)
      .subscribe((usuarios) => {
        if (refresh) {
          this.usuarios = usuarios;
        } else {
          usuarios.forEach((u) => this.usuarios.push(u));
        }

        this.hasMore = usuarios.length >= 5;
        this.nextPage = this.nextPage + (this.hasMore ? 1 : 0);
        loader.dismiss();
      }, (error) => {
        this.msg.errorWithResponse(error);
        loader.dismiss();
      });
  }

  editar(usuario: Usuario) {
    this.navCtrl.push(CadastroUsuariosPage, { usuario: usuario });
  }

  novo() {
    this.navCtrl.push(CadastroUsuariosPage, { usuario: {} });
  }

  voltar() {
    this.navCtrl.pop();
  }

  isUsuarioAtivo(usuario: Usuario): boolean {
    return Boolean(usuario.ativo);
  }
}
