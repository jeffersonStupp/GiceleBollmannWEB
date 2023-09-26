import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioListagemComponent } from './pages/usuario-listagem/usuario-listagem.component';
import { UsuarioCadastroComponent } from './pages/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLogadoGuard } from './guards/usuario-logado.guards';


const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: UsuarioCadastroComponent },
  {
    path: '',
    canActivate: [UsuarioLogadoGuard],
    component: BarraSuperiorComponent,
    children: [
      { path: 'principal', component: MenuPrincipalComponent },
      {
        path: 'usuario',
        children: [
          { path: 'listagem', component: UsuarioListagemComponent },
          { path: 'cadastro', component: UsuarioCadastroComponent },
          { path: 'cadastro/:id', component: UsuarioCadastroComponent },
        ],
      },


    ],
  },

  { path: '**', redirectTo: '/principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
