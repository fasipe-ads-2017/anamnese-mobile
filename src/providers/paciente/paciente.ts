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
   * @returns Paciente encontrado.
   */
  buscarPorCpf(cpf: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url.get()}/paciente?cpf=${cpf}`);
  }

  /**
   * Busca um paciente pelo nome.
   * @param nome Nome do paciente
   * @param pageNumber Número da página
   * @returns Lista de pacientes encontrados.
   */
  buscarPorNome(nome: string, pageNumber: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.url.get()}/paciente?nome=${nome}&page=${pageNumber}`);
  }

  /**
   * Busca um paciente pelo Id.
   * @param id  Id do paciente
   * @returns Paciente encontrado.
   */
  buscarPorId(id: string) {
    return this.http.get<Paciente>(`${this.url.get()}/paciente?_id=${id}`);
  }

  /**
   * Atualiza os dados do paciente
   * @param paciente dados do paciente
   */
  atualizar(paciente: Paciente): Observable<any> {
    return this.http.put(`${this.url.get()}/paciente`, paciente);
  }

  /**
   * Insere um novo paciente
   * @param paciente dados do paciente
   */
  inserir(paciente: Paciente): Observable<any> {
    return this.http.post(`${this.url.get()}/paciente`, paciente);
  }

  /**
   * Atualiza a foto do paciente
   * @param paciente Paciente
   * @param foto Foto do paciente em base 64
   */
  atualizarFoto(paciente: Paciente, foto: string) {
    return this.http.post(`${this.url.get()}/foto`, { _id: paciente._id, foto: foto });
  }

  /**
   * Busca a foto de um paciente
   * @param paciente Paciente para buscar a foto
   */
  buscarFoto(paciente: Paciente): Observable<any> {
    return this.http.get(`${this.url.get()}/foto?_id=${paciente._id}`);
  }
}
