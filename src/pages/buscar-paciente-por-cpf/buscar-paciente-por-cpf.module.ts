import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarPacientePorCpfPage } from './buscar-paciente-por-cpf';

@NgModule({
  declarations: [
    BuscarPacientePorCpfPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarPacientePorCpfPage),
  ],
})
export class BuscarPacientePorCpfPageModule {}
