import { Usuario } from './../../model/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  constructor(
    public http: HttpClient,
    public url: UrlProvider) {
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

    let usuario = this.getUsuarioAutenticado();

    // Adiciona o token de autenticacao
    if (usuario) {
      headers = headers.set('Authorization', `Bearer ${usuario.token}`);
    } else {
      console.log('Usuário não informado!');
    }

    return headers;
  }

  /**
   * Realiza o login do usuario.
   * @param email Email do usuário
   * @param senha Senha do usuário
   */
  entrar(email: string, senha: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url.get()}/usuario`, { email: email, senha: senha });
  }

  /**
   * Valida o token do usuário, se ainda está ativo.
   * @param token
   */
  validar(token: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url.get()}/usuario?token=${token}`);
  }

  /**
   * Salva um usuário
   * @param usuario dados do Usuário para salvar
   */
  salvar(usuario: Usuario) {
    usuario.ativo = usuario.ativo.toString() == 'true';
    usuario.administrador = usuario.administrador.toString() == 'true';
    return this.http.post<Usuario>(`${this.url.get()}/usuario`, usuario, { headers: this.buildHttpHeaders() });
  }

  /**
   * Lista usuários
   * @param nomeUsuario Nome do usuario para pesquisar
   * @param page Número da página
   */
  listar(nomeUsuario: string, page: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url.get()}/usuario?nome=${nomeUsuario}&page=${page}`, { headers: this.buildHttpHeaders() });
  }

  /**
   * Salva o usuário autenticado.
   * @param usuario Dados do usuário
   */
  setUsuarioAutenticado(usuario: Usuario) {
    // Salva o usuário
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Salva o email para futuros logins
    localStorage.setItem('email', usuario.email);
  }

  /**
   * Limpa os dados do usuário autenticado.
   */
  removeUsuarioAutenticado() {
    localStorage.removeItem('usuario');
  }

  /**
   * Retorna o usuário autenticado, se houver.
   */
  getUsuarioAutenticado(): Usuario {
    let json = localStorage.getItem('usuario');
    if (json) {
      return JSON.parse(json);
    }
    return undefined;
  }

  /**
   * Retorna o ultimo email usado para login
   */
  getUltimoEmail() {
    return localStorage.getItem('email') || '';
  }
}
