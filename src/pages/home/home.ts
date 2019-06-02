import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { EsqueciASenhaPage } from './../esqueci-a-senha/esqueci-a-senha';
import { PrincipalPage } from './../principal/principal';
import { Component, ViewChild } from '@angular/core';
import { NavController, TextInput, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('emailInput') emailInput: TextInput;
  @ViewChild('senhaInput') senhaInput: TextInput;

  public email: string = '';
  public senha: string = '';

  constructor(
    public navCtrl: NavController,
    public usuarioProvider: UsuarioProvider,
    public msg: MensagemProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.emailInput.setFocus(), 100);

    this.email = this.usuarioProvider.getUltimoEmail();

    let usuario = this.usuarioProvider.getUsuarioAutenticado();

    if (usuario) {

      const loader = this.loadingCtrl.create({
        content: 'Aguarde, entrando...'
      });

      loader.present();

      this.usuarioProvider.validar(usuario.token)
        .subscribe((u) => {
          loader.dismiss();

          usuario.nome = u.nome;
          usuario.email = u.email;

          this.usuarioProvider.setUsuarioAutenticado(usuario);
          this.navCtrl.setRoot(PrincipalPage, { usuario: usuario });
        }, (err) => {
          loader.dismiss();

          this.msg.errorWithResponse(err);
        });
    }
  }

  entrar() {
    const loader = this.loadingCtrl.create({
      content: 'Aguarde, entrando...'
    });

    loader.present();

    this.usuarioProvider.entrar(this.email, this.senha)
      .subscribe((usuario) => {

        loader.dismiss();

        this.usuarioProvider.setUsuarioAutenticado(usuario);
        this.navCtrl.setRoot(PrincipalPage, { usuario: usuario });

      }, (err) => {
        loader.dismiss();

        this.msg.errorWithResponse(err);
      });
  }

  esqueciASenha() {
    this.navCtrl.push(EsqueciASenhaPage);
  }
}
