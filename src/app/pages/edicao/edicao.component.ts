import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Usuario from 'src/app/models/usuario.model';
import { AlertService } from 'src/app/services/alert.service';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.css'],
})
export class EdicaoComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public ActivatedRoute: ActivatedRoute,
    public usuarioService: UsuarioService,
    public alertService: AlertService
  ) {}
  public ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.params['id'];

    document.title = 'edicão';
    this.chamarApiParaObterPorId(this.id);

    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;
    // let jsonTexto = JSON.stringify(this.formulario.getRawValue());
    //alert(jsonTexto);

    // if (this.formulario.invalid) {
    //   return;
    // }

    let usuario: Usuario = new Usuario(this.formulario.getRawValue());

    this.chamarApiAtualizar(usuario);
  }

  public inicializarConfigForm(): void {
    this.formulario = this.formBuilder.group({
      id: [0],
      nome: [null, [Validators.required, Validators.maxLength(150)]],
      email: [
        null,
        [Validators.required, Validators.maxLength(150), Validators.email],
      ],
      userName:[null,[Validators.required]],
telefone:[null,[Validators.minLength(11),Validators.maxLength(15)]],
      senha: [null, [Validators.required, Validators.maxLength(150)]],
      conf: [null, [Validators.required, Validators.maxLength(150)]],
      ativo: [true],
      tipo: ["usuario"],
    });
  }

  public chamarApiParaObterPorId(id: number): void {
    this.usuarioService.obterPorId(id).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.formulario.patchValue(resposta);
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
  public chamarApiAtualizar(usuario: Usuario) {
    this.usuarioService.atualizar(usuario).subscribe(
      (resposta) => {

        if (resposta != null) {
          this.alertService.showToastrSuccess('usuário atualizado');
          this.router.navigate(['/usuario/listagem']);
        } else {
          this.alertService.showToastrError('erro ao atualizar');
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }

  public voltar(mensagem:string){
    this.alertService.showToastrInfo(mensagem);
  }

}
