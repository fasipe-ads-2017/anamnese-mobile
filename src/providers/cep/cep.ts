import { Endereco } from './../../model/endereco.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CepProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CepProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * Busca um endereço somente pelo CEP
   * @param cep CEP a ser buscado
   */
  buscarEndereco(cep: string): Observable<Endereco> {
    const cepFiltrado = this.filtrarSomenteNumeros(cep);

    if (cepFiltrado.length < 7) {
      return;
    }
    return this.http.get<Endereco>(`http://viacep.com.br/ws/${cepFiltrado}/json/`);
  }

  filtrarSomenteNumeros(valor: string) {
    return valor.replace(/[^0-9]/g, '');
  }

}
