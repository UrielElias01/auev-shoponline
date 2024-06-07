import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  items: MenuItem[] | any;

  constructor(private router: Router) {}
  
  ngOnInit() {
  this.items = [
    {
      items: [
        {
          label: 'Ingresar',
          icon: 'pi pi-sign-in',
          command: () => this.router.navigate(['/login']) // Redirige al componente de login
        },
        {
          label: 'Registrar',
          icon: 'pi pi-user-plus',
          command: () => this.router.navigate(['/register']) // Redirige al componente de register
        },
      ],
    },
  ];
  }
}
