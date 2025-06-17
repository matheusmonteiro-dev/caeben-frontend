import { Routes } from '@angular/router';
import { ProdutoSelecionadoComponent } from './paginas/produto-selecionado/produto-selecionado.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { CarrinhoComponent } from './paginas/carrinho/carrinho.component';
import { LoginCarrinhoComponent } from './paginas/login-carrinho/login-carrinho.component';
import { LoginCadastroComponent } from './paginas/login-cadastro/login-cadastro.component';
import { LoginEsqueciMinhaSenhaComponent } from './paginas/login-esqueci-minha-senha/login-esqueci-minha-senha.component';
import { NovaSenhaComponent } from './paginas/nova-senha/nova-senha.component';

export const routes: Routes = [
    {path:'produto-selecionado', component:ProdutoSelecionadoComponent},
    {path:'produtos', component:PrincipalComponent},
    {path:'carrinho', component:CarrinhoComponent},
    {path:'login-carrinho', component:LoginCarrinhoComponent},
    {path:'login-cadastro', component:LoginCadastroComponent},
    {path:'login-esqueci-minha-senha',component:LoginEsqueciMinhaSenhaComponent},
    {path:'login-nova-senha',component:NovaSenhaComponent},
    {
    path:'',
    redirectTo:'/produtos',
    pathMatch:'full'
    }

];
