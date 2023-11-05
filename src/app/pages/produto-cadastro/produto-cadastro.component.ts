import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ProdutoService } from 'src/app/services/produto.service';
import Produto from 'src/app/models/produto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css'],
})
export class ProdutoCadastroComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,

    public produtoService: ProdutoService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    document.title = 'Cadastro de produto';

    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;

     if (this.formulario.invalid) {
       return;
     }

    let produto: Produto = new Produto(this.formulario.getRawValue());

    this.chamarApiParaCadastrar(produto);
  }

  private inicializarConfigForm(): void {
    this.formulario = this.formBuilder.group({
      id: [0],
      titulo: [null, [Validators.required, Validators.maxLength(20)]],
      descricao: [
        null,
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(30),
        ],
      ],
      imagem: [null, [Validators.required]],
      preco: [null, [Validators.required]],
    });
  }

  public chamarApiParaCadastrar(produto: Produto): void {
    this.produtoService.adicionar(produto).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.alertService.showToastrSuccess('Produto cadastrado com sucesso');
          this.router.navigate(['/usuario/dashboard']);
        } else {
          this.alertService.showToastrError('Erro ao cadastrar');
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }

  public voltar(mensagem: string) {
    this.alertService.showToastrInfo(mensagem);
  }

  public formatarDecimal(valor: number): string {
    return valor.toFixed(2);
  }





}
