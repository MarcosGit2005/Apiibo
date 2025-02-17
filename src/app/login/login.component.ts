import {Component, EventEmitter, Output} from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {UserServiceService} from '../../services/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  @Output() closePopup = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private authService: AuthServiceService, private userService: UserServiceService, private router: Router) { }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.userService.setUser(this.username);
      this.loginSuccess.emit();
      this.cerrar();
      this.router.navigate(['']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }

  cerrar() {
    this.closePopup.emit();
  }
}
