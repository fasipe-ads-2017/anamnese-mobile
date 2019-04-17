import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarPacientePorNomePage } from './buscar-paciente-por-nome';

@NgModule({
  declarations: [
    BuscarPacientePorNomePage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarPacientePorNomePage),
  ],
})
export class BuscarPacientePorNomePageModule {}
