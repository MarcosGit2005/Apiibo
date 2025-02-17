import {Component, Input} from '@angular/core';
import {AuthServiceService} from '../../../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-amiibo',
  standalone: false,
  templateUrl: './amiibo.component.html',
  styleUrl: './amiibo.component.css'
})
export class AmiiboComponent {
  @Input() amiibo:any;
  @Input() amiibosFavoritos:any;

  isInFavourites = false;
  isLoggedIn = false;

  constructor(private router:Router, private authService: AuthServiceService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.isInFavourites = this.amiibosFavoritos.includes(this.amiibo.head+this.amiibo.tail);
    }
  }

  goToDetails(head: String,tail: String){
    this.router.navigate([`/amiibo/${head}/${tail}`]);
  }

  addToFavourites(){

    // Mantener solo los últimos 10 elementos
    if (this.amiibosFavoritos.length >= 10) {
      alert("Solo se puede tener 10 amiibos como favoritos");
      return;
    }
    this.amiibosFavoritos.push(this.amiibo.head+this.amiibo.tail);

    // Guardar en localStorage
    localStorage.setItem("favoritos", JSON.stringify(this.amiibosFavoritos));
    this.isInFavourites = true;
  }

  removeFromFavourites(){
    const index = this.amiibosFavoritos.indexOf(this.amiibo.head+this.amiibo.tail);
    if (index !== -1) {
      // Modifica el array directamente en vez de crear uno nuevo para que los demás componentes lo detecten
      this.amiibosFavoritos.splice(index, 1);
    }
    localStorage.setItem("favoritos", JSON.stringify(this.amiibosFavoritos));
    this.isInFavourites = false;
  }
}
