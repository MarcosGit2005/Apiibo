import { Injectable } from '@angular/core';
import {Amiibo} from '../model/Amiibo';

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
          a.head,
          a.tail,
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
  async getAmiiboById(id:string){
    let head:string = id.substring(0,id.length/2);
    let tail:string = id.substring(id.length/2);
    try{
      let result = await fetch(this.apiLink+`amiibo/?head=${head}&tail=${tail}`);
      let data = await result.json();
      return new Amiibo(
        data['amiibo'][0].head,
        data['amiibo'][0].tail,
        data['amiibo'][0].name,
        data['amiibo'][0].amiiboSeries,
        data['amiibo'][0].character,
        data['amiibo'][0].gameSeries,
        data['amiibo'][0].image,
        data['amiibo'][0].release,
        data['amiibo'][0].type,
      );
    } catch {
      console.error("Error en la búsqueda de amiibos por id");
    }
    return null;
  }
  async getAmiibosTypes(){
    try{
      let amiibosTypes:Set<string> = new Set<string>()
      let result = await fetch(this.apiLink+`type/`);
      let data = await result.json();
      data.amiibo.forEach((type:any) => {
        amiibosTypes.add(type.name);
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
      let result = await fetch(this.apiLink+`gameseries/`);
      let data = await result.json();
      data.amiibo.forEach((gameseries:any) => {
        amiibosGameSeries.add(gameseries.name);
      });
      return amiibosGameSeries;
    } catch {
      console.error("Error en la búsqueda de las sagas de amiibos");
    }
    return null;
  }
  async getAmiibosSeries(){
    try{
      let amiibosGameSeries:Set<string> = new Set<string>()
      let result = await fetch(this.apiLink+`amiiboseries/`);
      let data = await result.json();
      data.amiibo.forEach((amiiboseries:any) => {
        amiibosGameSeries.add(amiiboseries.name);
      });
      return amiibosGameSeries;
    } catch {
      console.error("Error en la búsqueda de las sagas de amiibos");
    }
    return null;
  }

}
