import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientePreviewPage } from './paciente-preview';

@NgModule({
  declarations: [
    PacientePreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientePreviewPage),
  ],
})
export class PacientePreviewPageModule {}
