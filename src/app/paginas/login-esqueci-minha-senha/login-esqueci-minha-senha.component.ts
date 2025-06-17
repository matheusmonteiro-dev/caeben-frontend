import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EmailDataService } from '../../services/email-data.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-esqueci-minha-senha',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-esqueci-minha-senha.component.html',
  styleUrl: './login-esqueci-minha-senha.component.css',
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
    ]})
export class LoginEsqueciMinhaSenhaComponent {

  loginForm!:FormGroup;
  constructor(private loginService:LoginService, private router:Router){}
  ngOnInit(): void {
      this.loginForm=new FormGroup({
        email:new FormControl('',Validators.required),
      })}
  verificarEmail(){
    this.loginService.verificarSeEmailJaExiste(this.loginForm.get('email')?.value).subscribe();
  }
}
