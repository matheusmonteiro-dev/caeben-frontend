import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgSwitchDefault } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { EmailDataService } from '../../services/email-data.service';

@Component({
  selector: 'app-login-carrinho',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-carrinho.component.html',
  styleUrl: './login-carrinho.component.css',
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
  ]
})
export class LoginCarrinhoComponent implements OnInit {
  usuarioForm!:FormGroup;
  usuario!:Usuario;
  loginOuSenha:boolean=true;
  tentativaLogin:boolean=false;
  exibirFormulario:boolean=true;
  userAutorizado:boolean=false;
  constructor(private loginService:LoginService,private router:Router,private data:EmailDataService){
  }
  ngOnInit(): void {
    this.usuarioForm=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.email]),
      senha:new FormControl('',Validators.required)
      
    })
  }
  esqueciMinhaSenha(){
    this.router.navigateByUrl('/login-esqueci-minha-senha')
  }
  email(){
    this.data.setEmail(this.usuarioForm.get('email')?.value);
  }
  enviarEmail(){
    this.loginService.verificarSeEmailNaoExiste(this.usuarioForm.get('email')?.value).subscribe(()=>{
    });
  }
  login(){
    this.usuario={email:this.usuarioForm.get('email')?.value,senha:this.usuarioForm.get('senha')?.value}
    console.log(this.usuario);
    this.loginService.fazerLogin(this.usuario).subscribe({
      next: (usuarioId) => {
        this.data.setEmail(true);
        this.loginOuSenha=true
        console.log(usuarioId);
        localStorage.setItem('id',JSON.stringify(usuarioId));
        this.router.navigateByUrl('/produto-selecionado');
        console.log(true);
      },
      error:(err:HttpErrorResponse)=>{
        this.loginOuSenha=false;
        console.log("erro")
        console.log(this.loginOuSenha);
      }
    });
    }
}
