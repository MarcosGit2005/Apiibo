import { Injectable } from '@angular/core';
import {Amiibo} from './model/Amiibo';

@Injectable({
  providedIn: 'root'
})
export class AmiiboApiServiceService {
  apiLink:string = "https://www.amiiboapi.com/api/";

  constructor() { }

  async getAllAmiiboByName(amiiboName:string){
    try{
      let result = await fetch(this.apiLink+`amiibo/?character=${amiiboName}`);
      let data = await result.json();
      const amiibosResponse:Amiibo[]= [];
      data.amiibo.forEach((a:any) => {
        amiibosResponse.push(new Amiibo(
          <number>(a.head+a.tail),
          a.name,
          a.amiiboSeries,
          a.character,
          a.gameSeries,
          a.image,
          a.release,
          a.type,
        ));
      })
      return amiibosResponse;
    } catch {
      console.error("Error en la búsqueda de amiibos por nombre del personaje");
    }
    return null;
  }
}
