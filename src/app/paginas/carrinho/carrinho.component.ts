import { Component, OnInit, ɵformatRuntimeError } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { ProdutoCarrinho } from '../../interfaces/produto-carrinho';
import { InterfaceImagem } from '../../interfaces/interface-imagem';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ProdutoParaVendedor } from '../../interfaces/produto-para-vendedor';
import { EnviarCarrinho } from '../../interfaces/enviar-carrinho';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
})

export class CarrinhoComponent implements OnInit {
  produtos:ProdutoCarrinho[]=[];
  imagens:InterfaceImagem[]=[];
  valorMaximo:number=0;
  formaDePagamento='';
  tipoValor:number=0;
  produtosVendedor:ProdutoParaVendedor[]=[{
    nome:'',
    cor:'',
    tamanho:'',
  }];
  listaCount :number[]=[]
  listaMax:number[]=[];
  exibirFormulario:boolean=false;
  enviarAoFabricante:boolean=false;
 constructor(private dataService:DataServiceService,private backendService:BackendService,){}
 ngOnInit(): void {
   this.obterProduto();
   this.obterImagens();
   console.log("forma de pagamento "+this.produtos.length)
   console.log(this.listaCount+" lista")
 }
 cancelar(index:number){
  this.listaCount[index]=1;
  this.obterProduto();
  console.log(this.listaCount)
 }
 removerItem(produto:ProdutoCarrinho){
    this.backendService.removerItemCarrinho(produto).subscribe(()=>{
      console.log(produto)
      this.obterProduto();
      console.log('remover item');});
    
 }
 adicionarContador(index: number){
  this.listaCount[index] = this.listaCount[index]+1;
  console.log(this.listaCount)
  console.log(this.designarValorMaxPorTenis());
  console.log(this.designarValorMax());
 }
 diminuirContador(index: number){
  this.listaCount[index] = this.listaCount[index]-1
  console.log(this.designarValorMaxPorTenis());
  console.log(this.designarValorMax());
  if(this.listaCount[index]<0){
    this.listaCount[index]=0;
  }
 }
 enviarPagamento(){ 
  this.designarValor(); 
  this.enviarAoFabricante=true;
  if(this.formaDePagamento!=''){
  for(let i=0;i<this.produtos.length;i++){
    this.produtosVendedor[i]={nome:this.produtos[i].nome,cor:this.produtos[i].cor,tamanho:this.produtos[i].tamanho} 
  }
  const produtosFormatados = this.produtosVendedor
  .map(p => `| ${p.nome} - Cor: ${p.cor} - Tamanho: ${p.tamanho}`)
  .join('\n');  
  const mensagem = `\n${produtosFormatados}\n\nValor Total: R$${this.tipoValor}\nForma de Pagamento: ${this.formaDePagamento}`;
  const listaJson = JSON.stringify(mensagem, null, 2).split('\\n').join('\n');;
  console.log(this.produtosVendedor);
  window.open(`https://wa.me/21976365113?text=${listaJson}`);
}
};

 obterImagens(){
  console.log(this.dataService.getImagem());
  this.imagens.push(this.dataService.getImagem())
  console.log(this.imagens[0]);
 }

 obterProduto(){
  let id=JSON.parse(localStorage.getItem('id') || 'null');
  console.log(id+'idd')
  this.backendService.getCarrinho(id).subscribe((carrinho)=>{
    this.produtos=carrinho;
    this.listaCount = new Array(this.produtos.length).fill(1);
    this.designarValorMaxPorTenis();
    this.designarValorMax();
    console.log(carrinho);
  });
 }
  private designarValorMax(){
  let valor=0;  
  for(let i=0;i<this.listaMax.length;i++){
      valor+=this.listaMax[i];
    }
    this.valorMaximo=valor;
    console.log(this.valorMaximo);
 }
  private designarValorMaxPorTenis(){
  const lista=[];
  let valorMaxPorTenis:number=0;
  for(let i=0;i<this.produtos.length;i++){
    valorMaxPorTenis=this.produtos[i].preco*this.listaCount[i];
    lista.push(valorMaxPorTenis);  
    console.log(valorMaxPorTenis);
    console.log(this.listaCount,this.produtos[i].preco)
  }
  this.listaMax=lista;
  console.log(this.listaMax)
 }
 private designarValor(){
  if(this.formaDePagamento=="à vista/PIX"){
    this.tipoValor=this.valorMaximo;
  }else if(this.formaDePagamento=="debito"){
    this.tipoValor=(this.valorMaximo*10/100)+this.valorMaximo; 
  }
  else{
    this.tipoValor=(this.valorMaximo*15/100)+this.valorMaximo;
  } 
  }
}
