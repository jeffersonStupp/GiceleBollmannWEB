import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';

import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioListagemComponent } from './pages/usuario-listagem/usuario-listagem.component';
import { UsuarioCadastroComponent } from './pages/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLogadoGuard } from './guards/usuario-logado.guards';
import { AuthInterceptor } from './interceptors/requisicao.interceptor';

import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { BarraInferiorComponent } from './components/barra-inferior/barra-inferior.component';
import { CarrocelComponent } from './components/carrocel/carrocel.component';
import { EdicaoComponent } from './pages/edicao/edicao.component';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    BarraSuperiorComponent,
    ValidatorComponent,
    CpfPipe,
    TelefonePipe,
    DateFormatPipe,
    LoginComponent,
    UsuarioListagemComponent,
    UsuarioCadastroComponent,
    DateTimeFormatPipe,
    BarraInferiorComponent,
    CarrocelComponent,
    EdicaoComponent,
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
  providers: [
    UsuarioLogadoGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
