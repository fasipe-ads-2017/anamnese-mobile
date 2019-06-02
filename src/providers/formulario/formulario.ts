import { Paciente } from './../../model/paciente.model';
import { Formulario } from './../../model/formulario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { UsuarioProvider } from '../usuario/usuario';

/*
  Generated class for the FormularioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormularioProvider {

  constructor(
    public http: HttpClient,
    public url: UrlProvider,
    public usuarioProvider: UsuarioProvider) {
  }

  /**
  * Constrói os headers para as consultas HTTP.
  */
  buildHttpHeaders(): HttpHeaders {
    // cria uma instância de Headers
    let headers = new HttpHeaders();
    // Adiciona o tipo de conteúdo application/json
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');

    let usuario = this.usuarioProvider.getUsuarioAutenticado();

    // Adiciona o token de autenticacao
    if (usuario) {
      headers = headers.set('Authorization', `Bearer ${usuario.token}`);
    }

    return headers;
  }

  /**
   * Busca um formulário pelo id.
   * @param _id Id do formulário
   */
  buscarPorId(_id: string): Observable<Formulario> {
    return this.http.get<Formulario>(`${this.url.get()}/formulario?_id=${_id}`, { headers: this.buildHttpHeaders() });
  }

  /**
   * Busca lista de pacientes por id do paciente
   * @param paciente Paciente para buscar
   */
  buscarPorPaciente(paciente: Paciente): Observable<Formulario[]> {
    return this.http.get<Formulario[]>(`${this.url.get()}/formulario?_idPaciente=${paciente._id}`, { headers: this.buildHttpHeaders() });
  }

  /**
   * Salva os dados do formulário
   * @param formulario Dados do formulário
   */
  salvarFormulario(formulario: Formulario) {
    return this.http.post(`${this.url.get()}/formulario`, formulario, { headers: this.buildHttpHeaders() });
  }
}
