import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm= this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$')
    ]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private router:Router, private mensaje: MessageService) { }


  login() {
    console.log('Login');
    const { email, password } = this.loginForm.value;

    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email o Contraseña Incorrecta' });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email o Contraseña Incorrecta' });
      }
    );
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

}
