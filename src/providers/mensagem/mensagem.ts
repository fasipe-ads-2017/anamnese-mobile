import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

/*
  Generated class for the MensagemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensagemProvider {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) { }

  errorWithResponse(response: any) {
    const message = this.buildErrorMessage(response);

    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: 'Erro',

        message: message,
        buttons: [
          {
            text: 'Ok',
            handler: () => resolve()
          }
        ]
      });
      confirm.present();
    });

    //this.showToast(this.buildErrorMessage(response));
  }

  showToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  buildErrorMessage(response: any): string {
    let msg = response.error.message;

    if (response.error.errors && Object.keys(response.error.errors).length > 0) {
      msg += "<ul>"
      for (const error of response.error.errors) {
        msg += "<li>" + error + "</li>";
      }
      msg += "</ul>"
    }

    return msg;
  }

  confirmar(message: string, title: string = 'Confirmação') {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: 'Confirmar',
            handler: () => resolve()
          },
          {
            text: 'Cancelar',
            handler: () => reject()
          }
        ]
      });
      confirm.present();
    });
  }

}
