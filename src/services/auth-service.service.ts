import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private usuarioFijo = { username: 'admin', password: '1234' };

  login(username: string, password: string): boolean {
    if (username === this.usuarioFijo.username && password === this.usuarioFijo.password) {
      sessionStorage.setItem('user', JSON.stringify(this.usuarioFijo));
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('user');
  }

  getUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }
}
