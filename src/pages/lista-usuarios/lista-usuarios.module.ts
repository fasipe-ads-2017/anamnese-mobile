import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaUsuariosPage } from './lista-usuarios';

@NgModule({
  declarations: [
    ListaUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaUsuariosPage),
  ],
})
export class ListaUsuariosPageModule {}
