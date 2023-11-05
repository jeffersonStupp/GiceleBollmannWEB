import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Usuario from 'src/app/models/usuario.model';
import { AlertService } from 'src/app/services/alert.service';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
})
export class UsuarioCadastroComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,

    public usuarioService: UsuarioService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    document.title = 'Cadastro de usuário';

    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;



    if (this.formulario.invalid) {
      return;
    }





    let usuario: Usuario = new Usuario(this.formulario.getRawValue());


  this.chamarApiParaAdicionar(usuario);


  }

  private inicializarConfigForm(): void {
    this.formulario = this.formBuilder.group({
      id: [0],
      nome: [null, [Validators.required, Validators.maxLength(150)]],
      email: [
        null,
        [Validators.required, Validators.maxLength(150), Validators.email],
      ],
      username: [null, [Validators.required]],
      telefone: [null, [Validators.minLength(11),Validators.required, Validators.maxLength(15)]],
      senha: [null, [Validators.required, Validators.required, Validators.minLength(6)]],
      conf: [null],
      ativo: [true],
      tipo: ['usuario'],
    });
    this.formulario.get('conf').setValidators([Validators.required, Validators.minLength(6), this.senhaConfirmaSenhaValidator.bind(this)]);
  }
  public  senhasconferem = false;

  public chamarApiParaAdicionar(usuario: Usuario): void {

    const senha = this.formulario.get('senha').value;
    const confirmaSenha = this.formulario.get('conf').value;

if(senha === confirmaSenha){
 this.senhasconferem = true;

  this.usuarioService.adicionar(usuario).subscribe(
    (resposta) => {


        if (resposta != null ) {
    this.alertService.showToastrSuccess('Usuário cadastrado com sucesso');
    this.router.navigate(['/usuario/listagem']);
  } else {
    this.alertService.showToastrError('Erro ao cadastrar usuário');
  }
},
(exception) => {
  let mensagemErro =
  typeof exception?.error == 'string' ? exception?.error : '';
  this.alertService.showToastrError('Erro na requisição', mensagemErro);
}
);
}else{
  this.formulario.invalid;

  this.alertService.showToastrError('Senhas não conferem');
  return

}

}



  public voltar(mensagem: string) {

    this.alertService.showToastrInfo(mensagem);
  }

  private senhaConfirmaSenhaValidator(control: AbstractControl): { [key: string]: any } | null {
    const senha = this.formulario.get('senha').value;
    const confirmaSenha = control.value;

    if (senha !== confirmaSenha) {
      return { senhasDiferentes: true };
    }

    return null;
  }














}



