import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEsqueciMinhaSenhaComponent } from './login-esqueci-minha-senha.component';

describe('LoginEsqueciMinhaSenhaComponent', () => {
  let component: LoginEsqueciMinhaSenhaComponent;
  let fixture: ComponentFixture<LoginEsqueciMinhaSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEsqueciMinhaSenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginEsqueciMinhaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
