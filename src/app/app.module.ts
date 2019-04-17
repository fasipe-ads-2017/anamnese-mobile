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

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    PrincipalPageModule,
    EsqueciASenhaPageModule,
    BuscarPacientePageModule,
    BuscarPacientePorNomePageModule,
    BuscarPacientePorCpfPageModule,
    PacienteCadastroPageModule
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
    UrlProvider
  ]
})
export class AppModule {}
