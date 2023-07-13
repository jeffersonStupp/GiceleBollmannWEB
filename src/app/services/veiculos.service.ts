import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Veiculo from '../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VeiculosService {
  private urlbase = 'http://localhost:5201/veiculo/';
  constructor(public httpClient: HttpClient) {}

  public entrada(placa: string) {
    return this.httpClient.post<Veiculo>(this.urlbase + 'entrada', placa);
  }
  public saida(veiculo: Veiculo) {
    return this.httpClient.put<Veiculo>(this.urlbase + 'saida', veiculo);
  }
  public obterPorId(id: number) {
    return this.httpClient.get<Veiculo>(this.urlbase + 'obterporid/' + id);
  }
  public obterTodosVeiculos() {
    return this.httpClient.get<Veiculo[]>(this.urlbase + 'listar');
  }
  public obterporplaca(placa: string) {
    return this.httpClient.get<any>(this.urlbase + 'obterporplaca/' + placa);
  }
  public obterTodosQueNaoSairam() {
    return this.httpClient.get<Veiculo[]>(this.urlbase + 'obterosquenaosairam');
  }
  public obterTodosQueJaSairam() {
    return this.httpClient.get<Veiculo[]>(this.urlbase + 'obterosquejasairam');
  }
  public excluir(id: number) {
    return this.httpClient.delete<any>(this.urlbase + 'excluir/' + id);
  }
}
