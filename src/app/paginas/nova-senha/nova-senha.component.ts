import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nova-senha.component.html',
  styleUrl: './nova-senha.component.css'
})
export class NovaSenhaComponent implements OnInit {
   loginForm!:FormGroup;
    constructor(private loginService:LoginService, private router:Router){}
    ngOnInit(): void {
        this.loginForm=new FormGroup({
          senha:new FormControl('',Validators.required),
        })}
    enviarSenha(){
      this.loginService.recuperarSenha(this.loginForm.get('senha')?.value).subscribe(()=>{
        this.router.navigateByUrl('/login-carrinho');
      });
    }
}
