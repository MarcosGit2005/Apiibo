import { Component } from '@angular/core';
import {Amiibo} from '../../../model/Amiibo';
import {AmiiboApiServiceService} from '../../../amiibo-api-service.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  constructor(private service:AmiiboApiServiceService) {
  }
  amiibos:Amiibo[] | null=[];
  searchAmiibo(amiiboName:string){
    this.service.getAllAmiiboByName(amiiboName).then((response) => {
      this.amiibos = response;
    });
  }
}
