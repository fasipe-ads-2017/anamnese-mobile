import { UrlProvider } from './../url/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Paciente } from '../../model/paciente.model';

/*
  Generated class for the PacienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacienteProvider {

  constructor(
    public http: HttpClient,
    public url: UrlProvider) {
  }

  /**
   * Busca um paciente pelo CPF.
   * @param cpf Cpf do Paciente
   */
  buscarPorCpf(cpf: number): Observable<Paciente> {
    return this.http.get(this.url.get() + '/api/paciente/porCpf/' + cpf);
  }

  /**
   * Busca um paciente pelo nome.
   * @param nome Nome do paciente
   * @param startFrom Começar pelo número x da lista (usado para paginação)
   */
  buscarPorNome(nome: string, startFrom: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url.get() + '/api/paciente/porNome/' + nome + '/' + startFrom);
  }

}
