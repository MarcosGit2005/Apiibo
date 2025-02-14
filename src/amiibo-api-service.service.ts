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
  async getAmiibosTypes(){
    try{
      let amiibosTypes:Set<string> = new Set<string>()
      let result = await fetch(this.apiLink+`amiibo/`);
      let data = await result.json();
      data.amiibo.forEach((a:any) => {
        amiibosTypes.add(a.type);
      });
      return amiibosTypes;
    } catch {
      console.error("Error en la búsqueda de los tipos de amiibos");
    }
    return null;
  }
  async getAmiibosGameSeries(){
    try{
      let amiibosGameSeries:Set<string> = new Set<string>()
      let result = await fetch(this.apiLink+`amiibo/`);
      let data = await result.json();
      data.amiibo.forEach((a:any) => {
        amiibosGameSeries.add(a.gameSeries);
      });
      return amiibosGameSeries;
    } catch {
      console.error("Error en la búsqueda de las sagas de amiibos");
    }
    return null;
  }
  async getTotalAmiibos(){
    try{
      let result = await fetch(this.apiLink+`amiibo/`);
      let data = await result.json();
      return data.amiibo.length;
    } catch {
      console.error("Error en la búsqueda del total de amiibos");
    }
    return null;
  }
}
