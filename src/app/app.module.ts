import { CadastroUsuariosPageModule } from './../pages/cadastro-usuarios/cadastro-usuarios.module';
import { ListaUsuariosPageModule } from './../pages/lista-usuarios/lista-usuarios.module';
import { CurrencyUtils } from './../utils/currency-utils';
import { FormularioPageModule } from './../pages/formulario/formulario.module';
import { HistoricoPacientePageModule } from './../pages/historico-paciente/historico-paciente.module';
import { PacientePreviewPageModule } from './../pages/paciente-preview/paciente-preview.module';
import { PacienteCadastroPageModule } from './../pages/paciente-cadastro/paciente-cadastro.module';
import { BuscarPacientePorNomePageModule } from '../pages/buscar-paciente-por-nome/buscar-paciente-por-nome.module';
import { BuscarPacientePorCpfPageModule } from './../pages/buscar-paciente-por-cpf/buscar-paciente-por-cpf.module';
import { BuscarPacientePageModule } from './../pages/buscar-paciente/buscar-paciente.module';
import { EsqueciASenhaPageModule } from './../pages/esqueci-a-senha/esqueci-a-senha.module';
import { PrincipalPageModule } from './../pages/principal/principal.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PacienteProvider } from '../providers/paciente/paciente';
import { UrlProvider } from '../providers/url/url';
import { Camera } from '@ionic-native/camera';
import { MensagemProvider } from '../providers/mensagem/mensagem';
import { HttpClientModule } from '@angular/common/http';
import { CepProvider } from '../providers/cep/cep';
import { FormularioProvider } from '../providers/formulario/formulario';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    PrincipalPageModule,
    EsqueciASenhaPageModule,
    BuscarPacientePageModule,
    BuscarPacientePorNomePageModule,
    BuscarPacientePorCpfPageModule,
    PacienteCadastroPageModule,
    PacientePreviewPageModule,
    HistoricoPacientePageModule,
    FormularioPageModule,
    ListaUsuariosPageModule,
    CadastroUsuariosPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PacienteProvider,
    UrlProvider,
    Camera,
    CurrencyUtils,
    MensagemProvider,
    CepProvider,
    FormularioProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
