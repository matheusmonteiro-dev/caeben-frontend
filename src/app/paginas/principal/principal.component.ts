import { Component, HostListener, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { ProdutoInterface } from '../../interfaces/produto-interface';
import { DataServiceService } from '../../services/data-service.service';
import { InterfaceImagem } from '../../interfaces/interface-imagem';
import { CarrinhoComponent } from '../carrinho/carrinho.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  animations: [
    trigger('scaleAnimation', [
      state('default', style({
        transform: 'scale(1)'
      })),
      state('hover', style({
        transform: 'scale(1.1)'
      })),
      transition('default => hover', animate('300ms ease-in')),
      transition('hover => default', animate('300ms ease-out'))
    ])
  ]
})
export class PrincipalComponent implements OnInit{
  produtos!:ProdutoInterface[];
  imagem:InterfaceImagem={imagem:''};
  constructor(private backendService:BackendService,private dataService:DataServiceService ){}
  ngOnInit():void{
    console.log('executando');
    this.backendService.getModelos().subscribe(code=>{
      this.produtos=code;
      console.log(this.produtos)
      console.log(code)
    });
  }

  itens = Array(4).fill(null); // Simula uma lista de 8 itens
  animationStates: string[] = this.itens.map(() => 'default');
  
  setAnimationState(index: number, state: 'default' | 'hover') {
    this.animationStates[index] = state;
  }
 
  enviarTenisParaProdutosSelecionados(imagemProduto:string,produto:ProdutoInterface){
    this.imagem={imagem:imagemProduto};
    this.dataService.setImagem(this.imagem);
    this.dataService.setProduto(produto);
    console.log(imagemProduto);
    console.log(produto);
  }

  gerarCaminhoImagem(id: number):string{
    const numeroFormatado = id.toString().padStart(2, '0');
    //console.log(`assets/tenis${numeroFormatado}.png`);
    return `assets/tenis${numeroFormatado}.png`;
};

  }
