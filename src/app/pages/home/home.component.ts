import { Component } from '@angular/core';
import {AmiiboApiServiceService} from '../../../services/amiibo-api-service.service';
import {SearchService} from '../../../services/search.service';
import {Amiibo} from '../../../model/Amiibo';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  amiibosInicio:Amiibo[] = []

  constructor(private amiiboApiService:AmiiboApiServiceService, private searchService:SearchService){}

  ngOnInit(){
    if (this.searchService.getHomeAmiibos().length == 0){
      this.amiiboApiService.getAllAmiiboByName("&amiiboSeries=Super Smash Bros.").then((response) => {
        this.amiibosInicio = response!;
      });
      this.searchService.setHomeAmiibos(this.amiibosInicio);
    } else {
      this.amiibosInicio = this.searchService.getHomeAmiibos();
    }
  }
}
