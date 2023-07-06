import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';

import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { PessoListagemComponent } from './pages/pesso-listagem/pesso-listagem.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { PessoListagemEnderecoComponent } from './pages/pesso-listagem-endereco/pesso-listagem-endereco.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    BarraSuperiorComponent,
    PessoListagemComponent,
    CadastroComponent,
    ValidatorComponent,
    CpfPipe,
    TelefonePipe,
    PessoListagemEnderecoComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
