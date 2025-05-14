import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [FormsModule, CommonModule, IonicModule],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.signup(this.email, this.password)
      .then(() => {
        this.router.navigate(['/app']);
      })
      .catch(err => {
        this.errorMessage = 'Error al crear cuenta: ' + err.message;
        console.error(err);
      });
  }
}
