import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the MensagemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensagemProvider {

  constructor(public toastCtrl: ToastController) { }

  errorWithResponse(response: any) {
    this.showToast(this.buildErrorMessage(response));
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

      let keys = Object.keys(response.error.errors);
      msg += '<div class="text-left">';
      msg += '<ul>';

      for (const attributeError of keys) {
        for (const message of response.error.errors[attributeError]) {
          msg += '<li>';
          msg += message;
          msg += '</li>';
        }
      }
      msg += '</ul>';
      msg += '</div>';
    }

    return msg;
  }

}
