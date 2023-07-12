import { Component, OnInit } from '@angular/core';
import Veiculo from 'src/app/models/veiculo.model';
import { AlertService } from 'src/app/services/alert.service';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-lista-veiculos-finalizados',
  templateUrl: './lista-veiculos-finalizados.component.html',
  styleUrls: ['./lista-veiculos-finalizados.component.css'],
})
export class ListaVeiculosFinalizadosComponent implements OnInit {
  public listafinalizados: Veiculo[] = [];
  constructor(
    public veiculoService: VeiculosService,
    public alertService: AlertService
  ) {}
  public ngOnInit(): void {
    document.title = 'Veiculos Finalizados';
    this.obterVeiculosFinalizadosDaApi();
  }
  public obterVeiculosFinalizadosDaApi() {
    this.veiculoService.obterTodosQueJaSairam().subscribe((resposta) => {
      if (resposta != null) {
        this.listafinalizados = resposta;
      } else {
        this.alertService.showToastrError('Erro na API');
      }
    });
  }
}
