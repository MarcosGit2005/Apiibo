import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from '../../../services/user-service.service';
import {AuthServiceService} from '../../../services/auth-service.service';
import {AmiiboApiServiceService} from '../../../services/amiibo-api-service.service';
import {Amiibo} from '../../../model/Amiibo';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  username:string = "";
  favoutitesIds:string[] = [];
  amiibosFavoritos:Amiibo[] = [];

  constructor(private router:Router,private authService: AuthServiceService,private userService:UserServiceService, private amiiboApiService:AmiiboApiServiceService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate([""]);
    }

    this.username = this.userService.getUser();

    this.reloadFavourites();
  }

  reloadFavourites(){
    this.favoutitesIds = JSON.parse(localStorage.getItem("favoritos") || '[]');
    const promises = this.favoutitesIds.map(id => this.amiiboApiService.getAmiiboById(id));
    Promise.all(promises).then(amiibos => {
      this.amiibosFavoritos = amiibos
        .filter(a => a !== null)
        .sort((a, b) => a.name.localeCompare(b.name)); // Ordenamos al final

    });
  }

  signOut(){
    this.authService.logout();
    this.userService.clearUser();
    window.location.reload();
  }

}
