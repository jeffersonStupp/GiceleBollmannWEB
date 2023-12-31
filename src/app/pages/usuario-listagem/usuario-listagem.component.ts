import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Usuario from 'src/app/models/usuario.model';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css'],
})
export class UsuarioListagemComponent implements OnInit {
  public listaUsuarios: Usuario[] = [];

  constructor(
    public router: Router,
    public autenticacaoService: AutenticacaoService,
    public usuarioService: UsuarioService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    document.title = 'Listagem de usuários';

    if (!this.autenticacaoService.tipoPerfilEhAdmin()) {
      this.router.navigate(['/principal']);
    }

    this.obterUsuariosDaApi();
  }

  public obterUsuariosDaApi(): void {
        this.usuarioService.obterTodos().subscribe(
      (resposta) => {
        if (resposta != null) {
          this.listaUsuarios = resposta;
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
public chamarexcluirUsuario(id:number):void{
  this.usuarioService.excluirUsuario(id).subscribe(
    (resposta) => {
if(resposta == null){
  this.alertService.showToastrSuccess(
    'Usuário excluido com sucesso');
    this.obterUsuariosDaApi();
}else{
  this.alertService.showToastrError(
    'Erro na requisição com o servidor'
  );
}
    });
}

  public alterarStatus(usuario: Usuario): void {
    this.usuarioService.alterarStatus(usuario.id).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.obterUsuariosDaApi();

          if (usuario.ativo) {
            this.alertService.showToastrSuccess(
              'Usuário desativado com sucesso'
            );
          } else {
            this.alertService.showToastrSuccess('Usuário ativado com sucesso');
          }
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
  public confirmarExcluir(id: number) {
    this.alertService.alertConfirm({
      title: 'Atenção',
      text: 'Você deseja realmente excluir o registro?',
      confirmButtonText: 'Sim',
      confirmButtonColor: 'green',
      showCancelButton: true,
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      fn: () => {
        this.chamarexcluirUsuario(id);
      },
      fnCancel: () => {
        this.alertService.showToastrInfo('Operação cancelada!');
      },
    });
  }
}
