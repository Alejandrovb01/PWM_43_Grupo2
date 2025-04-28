import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'; // Ajusta el path según tu proyecto
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
  ]

})
export class LoginComponent {
  usuarioInput: string = '';
  passwordInput: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.getUsuarios().subscribe((usuarios: any[]) => {
      const usuarioEncontrado = usuarios.find(data =>
        data['Usuario'] === this.usuarioInput && data['Contraseña'] === this.passwordInput
      );

      if (usuarioEncontrado) {
        console.log('Login exitoso');
        this.router.navigate(['/kitchen']);
      } else {
        console.error('Usuario o contraseña incorrectos');
        alert('Usuario o contraseña incorrectos');
      }
    }, error => {
      console.error('Error al obtener los usuarios', error);
    });
  }
}
