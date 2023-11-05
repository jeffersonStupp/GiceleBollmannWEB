import { Component, OnInit } from '@angular/core';
import Produto from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';




@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent implements OnInit{
  public tipoPerfilEhAdmin: boolean = null;
public listaProdutos:Produto[]=[];

constructor(
  public alertService: AlertService,
  public router: Router,
  public autenticacaoService: AutenticacaoService,
  public produtoSercice:ProdutoService

){}
public ngOnInit(): void {
  document.title = 'Listagem de produtos';

  this.tipoPerfilEhAdmin = this.autenticacaoService.tipoPerfilEhAdmin();
   

  this.obterProdutosDaApi();
}
public obterProdutosDaApi(): void {
  this.produtoSercice.obterTodos().subscribe(
(resposta) => {
  if (resposta != null) {
    this.listaProdutos = resposta;
  } else {
    this.alertService.showToastrError(
      'Erro na requisição com o servidor'
    );
  }
}, exception => {
  let mensagemErro = typeof(exception?.error) == "string" ? exception?.error : '';
  this.alertService.showToastrError('Erro na requisição', mensagemErro);
});
}


public chamarExcluirProduto(id:number):void{
  this.produtoSercice.excluir(id).subscribe(
    (resposta) => {
if(resposta == null){
  this.alertService.showToastrSuccess(
    'Produto excluido com sucesso');
    this.obterProdutosDaApi();
}else{
  this.alertService.showToastrError(
    'Erro na requisição com o servidor'
  );
}
    });
}


public confirmarExcluir(id: number) {
  this.alertService.alertConfirm({
    title: 'Atenção',
    text: 'Você deseja realmente excluir o Produto?',
    confirmButtonText: 'Sim',
    confirmButtonColor: 'green',
    showCancelButton: true,
    cancelButtonText: 'Não',
    cancelButtonColor: 'red',
    fn: () => {
      this.chamarExcluirProduto(id);
    },
    fnCancel: () => {
      this.alertService.showToastrInfo('Operação cancelada!');
    },
  });
}



}
