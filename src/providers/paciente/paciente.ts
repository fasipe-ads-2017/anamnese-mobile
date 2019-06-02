import { UsuarioProvider } from './../usuario/usuario';
import { UrlProvider } from './../url/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    } else {
      console.log('Usuário não informado!');
    }

    return headers;
  }

  /**
   * Busca um paciente pelo CPF.
   * @param cpf Cpf do Paciente
   * @returns Paciente encontrado.
   */
  buscarPorCpf(cpf: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url.get()}/paciente?cpf=${cpf}`, { headers: this.buildHttpHeaders() });
  }

  /**
   * Busca um paciente pelo nome.
   * @param nome Nome do paciente
   * @param pageNumber Número da página
   * @returns Lista de pacientes encontrados.
   */
  buscarPorNome(nome: string, pageNumber: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.url.get()}/paciente?nome=${nome}&page=${pageNumber}`, { headers: this.buildHttpHeaders() });
  }

  /**
   * Busca um paciente pelo Id.
   * @param id  Id do paciente
   * @returns Paciente encontrado.
   */
  buscarPorId(id: string) {
    return this.http.get<Paciente>(`${this.url.get()}/paciente?_id=${id}`, { headers: this.buildHttpHeaders() });
  }

  /**
   * Atualiza os dados do paciente
   * @param paciente dados do paciente
   */
  atualizar(paciente: Paciente): Observable<any> {
    return this.http.put(`${this.url.get()}/paciente`, paciente, { headers: this.buildHttpHeaders() });
  }

  /**
   * Insere um novo paciente
   * @param paciente dados do paciente
   */
  inserir(paciente: Paciente): Observable<any> {
    return this.http.post(`${this.url.get()}/paciente`, paciente, { headers: this.buildHttpHeaders() });
  }

  /**
   * Atualiza a foto do paciente
   * @param paciente Paciente
   * @param foto Foto do paciente em base 64
   */
  atualizarFoto(paciente: Paciente, foto: string) {
    return this.http.post(`${this.url.get()}/foto`, { _id: paciente._id, foto: foto }, { headers: this.buildHttpHeaders() });
  }

  /**
   * Busca a foto de um paciente
   * @param paciente Paciente para buscar a foto
   */
  buscarFoto(paciente: Paciente): Observable<any> {
    return this.http.get(`${this.url.get()}/foto?_id=${paciente._id}`, { headers: this.buildHttpHeaders() });
  }
}
