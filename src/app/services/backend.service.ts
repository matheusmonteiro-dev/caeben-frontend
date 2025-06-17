import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProdutoInterface } from '../interfaces/produto-interface';
import { ProdutoCarrinho } from '../interfaces/produto-carrinho';
import { EnviarCarrinho } from '../interfaces/enviar-carrinho';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly API ='http://localhost:8080/';
  constructor(private http:HttpClient) { }

  removerItemCarrinho(produto:ProdutoCarrinho):Observable<ProdutoCarrinho>{
    return this.http.delete<ProdutoCarrinho>(`${this.API}`+`carrinho/${produto.id}`,{ withCredentials: true })
  }
  getValorTotalCarrinho():Observable<number>{
    return this.http.get<number>(`${this.API}`+'carrinho/valorMax',{ withCredentials: true })
  }
  getCarrinho(id:number):Observable<ProdutoCarrinho[]>{
    return this.http.get<ProdutoCarrinho[]>(`${this.API}`+'carrinho/'+`${id}`,{ withCredentials: true });
  }
  enviarAoCarrinho(produto:ProdutoCarrinho):Observable<ProdutoCarrinho>{
    return this.http.post<ProdutoCarrinho>(`${this.API}`+'carrinho',produto,{ withCredentials: true });
  }
  
  getModelos():Observable<ProdutoInterface[]>{
    return this.http.get<ProdutoInterface[]>(`${this.API}`+'produto',{ withCredentials: true });
  }
}
