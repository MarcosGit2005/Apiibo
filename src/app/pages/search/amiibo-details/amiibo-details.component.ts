import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Amiibo} from '../../../../model/Amiibo';
import {AmiiboApiServiceService} from '../../../../services/amiibo-api-service.service';
import {AuthServiceService} from '../../../../services/auth-service.service';

@Component({
  selector: 'app-amiibo-details',
  standalone: false,
  templateUrl: './amiibo-details.component.html',
  styleUrl: './amiibo-details.component.css'
})
export class AmiiboDetailsComponent {
  amiibo!: Amiibo;
  isLoggedIn = false;

  constructor(private route: ActivatedRoute,private service:AmiiboApiServiceService,private authService: AuthServiceService){}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.service.getAllAmiiboByName("&head="+this.route.snapshot.paramMap.get('head')!+"&tail="+this.route.snapshot.paramMap.get('tail')!)
      .then((response) => {
      if (response) {
        this.amiibo = response[0];
      }
    });
  }

  mostrarImagen: boolean = false;
  posicionX: number = 0;
  posicionY: number = 0;

  mostrarPopup(event:Event) {
    this.mostrarImagen = true;

    // Obtener posición de la imagen
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.posicionX = rect.left;
    this.posicionY = rect.top; // Se coloca encima de la imagen
  }

  ocultarPopup() {
    this.mostrarImagen = false;
  }
}
