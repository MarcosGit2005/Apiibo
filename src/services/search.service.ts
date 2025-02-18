import { Injectable } from '@angular/core';
import {Amiibo} from '../model/Amiibo';

@Injectable({
  providedIn: 'root'
})

// Para guardarme los resultados y no perderlos cuando vaya a la página de detalles de un amiibo
export class SearchService {
  private lastResults: any[] = [];
  private homeAmiibos:Amiibo[] = []
  private pageNumber = -1;
  private amiibosPerPage = -1;

  setPage(pageNumber: number) {
    this.pageNumber = pageNumber;
  }
  setResults(results: any[]) {
    this.lastResults = results;
  }
  setAmiibosPerPage(amiibosPerPage: number) {
    this.amiibosPerPage = amiibosPerPage;
  }
  setHomeAmiibos(homeAmiibos: Amiibo[]) {
    this.homeAmiibos = homeAmiibos;
  }
  getResults(){
    return this.lastResults;
  }
  getPageNumber(){
    return this.pageNumber;
  }
  getAmiibosPerPage() {
    return this.amiibosPerPage;
  }
  getHomeAmiibos() {
    return this.homeAmiibos;
  }
}
