import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class EmailDataService {
  private dataSubject = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();
  
  
  constructor() { }
  setEmail(email:boolean){
    this.dataSubject.next(true);
  }

}
