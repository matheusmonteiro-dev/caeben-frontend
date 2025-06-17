import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { ProdutoInterface } from '../../interfaces/produto-interface';
import { CommonModule } from '@angular/common';
import { InterfaceImagem } from '../../interfaces/interface-imagem';
import { BackendService } from '../../services/backend.service';
import { ProdutoCarrinho } from '../../interfaces/produto-carrinho';
import { FormsModule } from '@angular/forms';
import { EmailDataService } from '../../services/email-data.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-produto-selecionado',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './produto-selecionado.component.html',
  styleUrl: './produto-selecionado.component.css'
})
export class ProdutoSelecionadoComponent implements OnInit {
    produto:ProdutoInterface={
    id:0,
    nome:'',
    preco:0,
    cor:'',
    tamanhos:[]
  };
  imagemDoProduto:InterfaceImagem={
    imagem:''
  };
  tamanho:string='';
  enviarAoFabricante:boolean=false;
  enviarAoCarrinho:boolean=false;
  selecionarTamanho:boolean=false;

  constructor(private dataService:DataServiceService, private router:Router, private backendService:BackendService,private data:EmailDataService, private loginService:LoginService){}
  ngOnInit(): void {
    this.obterProduto();
  }
  lista = {
    tamanhos: []
  };
  coresDeFundo = this.lista.tamanhos.map(() => 'none');
  produtoCarrinho:ProdutoCarrinho={
    id:0,
    nome:'',
    preco:0,
    cor:'',
    tamanho:'',
    imagem:''
  };
  formaDePagamento='';
  usuarioLogado:boolean=false;
  
  getLabelValue(event: Event ,index:number): void {
    this.coresDeFundo = this.lista.tamanhos.map(() => 'none');
    this.coresDeFundo[index] = 'yellow';
    const labelText = (event.target as HTMLLabelElement).innerText;
    this.tamanho=labelText;
    this.selecionarTamanho=true;
    console.log(this.selecionarTamanho);
  }
  obterProduto(){
    this.imagemDoProduto=this.dataService.getImagem();
    console.log(this.imagemDoProduto);
    this.produto=this.dataService.getProduto();
    console.log(this.produto);
  }
  adicionarCarrinho(){
    this.enviarAoCarrinho=true;
    if(this.selecionarTamanho ){
    let usuarioId=JSON.parse(localStorage.getItem('id') || 'null');
    console.log(usuarioId)
    console.log("enviando usuario")
    this.produtoCarrinho={id:usuarioId,nome:this.produto.nome,preco:this.produto.preco,cor:this.produto.cor,tamanho:this.tamanho,imagem:this.imagemDoProduto.imagem};
    this.loginService.usuarioLogado().subscribe((usuarioLogado)=>{
      console.log("enviando usuario")
      console.log(usuarioLogado);
      if(usuarioLogado===true){
        console.log('indo ao carrinho')
        this.backendService.enviarAoCarrinho(this.produtoCarrinho).subscribe(()=>{this.router.navigate(['/carrinho']);});   
      }
      // this.backendService.enviarAoCarrinho(this.produtoCarrinho).subscribe(()=>{});
      this.router.navigate(['/login-carrinho']);
    });
    console.log("logado?")
  }
}
  pagar(){
    this.enviarAoFabricante=true;
    if(this.formaDePagamento!='' && this.selecionarTamanho ){
      window.open(`https://wa.me/21976365113?text=${this.produto.nome+" cor: "+this.produto.cor+" tamanho: "+this.tamanho+", forma de pagamento: "+this.formaDePagamento}`, '_blank');
}
}

}
