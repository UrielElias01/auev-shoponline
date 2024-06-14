import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
  })
  
  constructor(private fb:FormBuilder, private authService:AuthService,
    private messageService: MessageService,
    private router: Router
  ){
  }

  get email(){ 
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  login() {
    console.log('Login');
    const { email, password } = this.loginForm.value;

    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email o contraseña incorrectos' });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar iniciar sesión' });
      }
    )
  }
}
