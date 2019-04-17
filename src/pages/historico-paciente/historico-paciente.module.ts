import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoPacientePage } from './historico-paciente';

@NgModule({
  declarations: [
    HistoricoPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoPacientePage),
  ],
})
export class HistoricoPacientePageModule {}
