import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroUsuariosPage } from './cadastro-usuarios';

@NgModule({
  declarations: [
    CadastroUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroUsuariosPage),
  ],
})
export class CadastroUsuariosPageModule {}
