import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { EmailDataService } from '../../services/email-data.service';
import { Usuario } from '../../interfaces/usuario';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-cadastro.component.html',
  styleUrl: './login-cadastro.component.css'
})
export class LoginCadastroComponent implements OnInit{
  usuario:Usuario={email:'',senha:''};
  cadastroForm!:FormGroup;
  constructor(private loginService:LoginService,private data:EmailDataService, private router:Router){}
  ngOnInit(): void {
      this.cadastroForm=new FormGroup({
        senha:new FormControl('',Validators.required)
      })
      console.log(this.usuario);
    }
    enviarCadastro(){
      this.loginService.cadastrar(this.cadastroForm.get('senha')?.value).subscribe(()=>{
        console.log("tudo pronto");
        this.router.navigateByUrl('/carrinho')
      });
    }
}
