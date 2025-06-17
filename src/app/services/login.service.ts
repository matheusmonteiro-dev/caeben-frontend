import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API ='http://localhost:8080/login';
  constructor(private http:HttpClient) { }

  fazerLogout():Observable<void>{
    return this.http.post<void>(this.API+'/logout',{},{withCredentials:true})
  }
  usuarioLogado():Observable<boolean>{
    return this.http.get<boolean>(this.API+'/tempo',{ withCredentials: true })
  }
  recuperarSenha(senha:string):Observable<string>{
    return this.http.post<string>(this.API+'/recuperarSenha',senha);
  }
  verificarSeEmailJaExiste(email:string):Observable<string>{
    return this.http.post<string>(this.API+'/validarSeEmailExiste',email);
  }
  cadastrar(senha:string):Observable<string>{
    return this.http.post<string>(this.API+'/cadastrar',senha);
  }
  verificarSeEmailNaoExiste(email:string):Observable<string>{
    return this.http.post<string>(this.API+'/validarSeEmailNaoExiste',email);
  }
  fazerLogin(usuario:Usuario):Observable<string>{
    return this.http.post<string>(this.API,usuario,{ withCredentials: true });
  }
}
