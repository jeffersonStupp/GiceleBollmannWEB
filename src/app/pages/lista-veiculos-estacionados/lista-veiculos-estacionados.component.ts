import { Component, OnInit } from '@angular/core';
import Pessoa from 'src/app/models/pessoa.model';
import Veiculo from 'src/app/models/veiculo.model';
import { AlertService } from 'src/app/services/alert.service';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-lista-veiculos-estacionados',
  templateUrl: './lista-veiculos-estacionados.component.html',
  styleUrls: ['./lista-veiculos-estacionados.component.css'],
})
export class ListaVeiculosEstacionadosComponent implements OnInit {
  public listaestacionados: Veiculo[] = [];

  constructor(
    public veiculoService: VeiculosService,
    public alertService: AlertService
  ) {}
  public ngOnInit(): void {
    document.title = 'Veiculos Estacionados';
    this.obterVeiculosEstavionadosDaApi();
  }
  public obterVeiculosEstavionadosDaApi() {
    this.veiculoService.obterTodosQueNaoSairam().subscribe((resposta) => {
      if (resposta != null) {
        this.listaestacionados = resposta;
      } else {
        this.alertService.showToastrError('Erro na API');
      }
    });
  }
}
