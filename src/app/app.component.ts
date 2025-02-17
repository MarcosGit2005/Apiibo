import { Component } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router';
import {UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto2EV';

  darkMode = false;
  mostrarLogin = false;
  isLoggedIn = false;

  constructor(private router:Router, private authService: AuthServiceService, private userService:UserServiceService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn){
      this.userService.setUser(this.authService.getUser().username);
    }
  }

  abrirLogin() {
    this.mostrarLogin = true;
  }

  cerrarLogin() {
    this.mostrarLogin = false;
  }

  usuarioLogueado() {
    this.isLoggedIn = true;
    this.cerrarLogin();
  }

  verPerfil() {
    this.router.navigate(['profile']);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
