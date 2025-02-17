import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Para guardarme los resultados y no perderlos cuando vaya a la página de detalles de un amiibo
export class SearchService {
  private lastResults: any[] = [];
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
  getResults(){
    return this.lastResults;
  }
  getPageNumber(){
    return this.pageNumber;
  }
  getAmiibosPerPage() {
    return this.amiibosPerPage;
  }
}
