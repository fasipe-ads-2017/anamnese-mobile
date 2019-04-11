import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarPacientePage } from './buscar-paciente';

@NgModule({
  declarations: [
    BuscarPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarPacientePage),
  ],
})
export class BuscarPacientePageModule {}
