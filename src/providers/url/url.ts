import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * Retorna a URL base dos serviços
   */
  get(): string {
    return 'https://us-central1-projeto-fisioterapia-fasipe.cloudfunctions.net';
  }
}
