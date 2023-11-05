import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Produto from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private urlBase = 'http://localhost:5201/';

  constructor(public httpClient: HttpClient) { }

  public adicionar(produto: Produto) {
    return this.httpClient.post<Produto>(
      this.urlBase + 'produto/cadastrar',
      produto
    );
  }
  public atualizar(produto: Produto) {
    return this.httpClient.put<Produto>(
      this.urlBase + 'produto/atualizar' ,
      produto
    );
  }
  public obterPorId(id: number) {
    return this.httpClient.get<Produto>(
      this.urlBase + 'produto/obterporid/' + id
    );
  }
  public obterTodos() {
    return this.httpClient.get<Produto[]>(this.urlBase + 'produto/listar');
  }
  public excluir(id:number){
    return this.httpClient.delete<any>(
      this.urlBase + 'produto/excluir/' + id
    );
  }
  public obterPorTitulo(titulo: string) {
    return this.httpClient.get<Produto>(
      this.urlBase + 'produto/obterporid/' + titulo
    );
  }

}
