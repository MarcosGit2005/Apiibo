import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private usuario: string = "";

  setUser(user: string): void {
    this.usuario = user;
  }

  getUser(): any {
    return this.usuario;
  }

  clearUser(): void {
    this.usuario = "";
  }
}
