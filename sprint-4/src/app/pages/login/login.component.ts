import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/app']);
      })
      .catch(err => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        console.error(err);
      });
  }
}
