import { Injectable } from '@angular/core';
import { ProdutoInterface } from '../interfaces/produto-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { InterfaceImagem } from '../interfaces/interface-imagem';
import { ProdutoCarrinho } from '../interfaces/produto-carrinho';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  constructor() { }

  setCarrinho(produto:ProdutoCarrinho):void{
    localStorage.setItem('produto-carrinho', JSON.stringify(produto));
  }
  getCarrinho():ProdutoCarrinho{
    return JSON.parse(localStorage.getItem('produto-carrinho') || '[]');
  }
  setImagem(imagem:InterfaceImagem):void {
    localStorage.setItem('imagemProduto', JSON.stringify(imagem));
  }
  getImagem(): InterfaceImagem {
    return JSON.parse(localStorage.getItem('imagemProduto') || '{"imagem": ""}');
  }

  setProduto(produto:ProdutoInterface):void {
    localStorage.setItem('produto', JSON.stringify(produto));
  }
  getProduto(): ProdutoInterface {
    return JSON.parse(localStorage.getItem('produto') || '{"produto": ""}');
  }
}
