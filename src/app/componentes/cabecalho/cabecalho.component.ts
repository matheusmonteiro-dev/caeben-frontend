import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  constructor(private dataService:DataServiceService, private loginService:LoginService, private router:Router){}
  logout(){
    console.log('logout');
    this.loginService.fazerLogout().subscribe(()=>{
      this.router.navigateByUrl('/produtos');
    });    
  }
  resetarItens(){
    localStorage.clear();
  }
}
