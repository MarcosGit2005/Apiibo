import {Component, ViewChild} from '@angular/core';
import {Amiibo} from '../../../model/Amiibo';
import {AmiiboApiServiceService} from '../../../services/amiibo-api-service.service';
import {AuthServiceService} from '../../../services/auth-service.service';
import {SearchService} from '../../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  constructor( private service:AmiiboApiServiceService,private authService: AuthServiceService, private searchService:SearchService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn){
      this.amiibosFavoritos = JSON.parse(localStorage.getItem("favoritos") || '[]');
    }

    service.getAmiibosTypes().then((response) => {
      response?.forEach(type => {this.typesOptions.add(type)})
    });
    service.getAmiibosGameSeries().then((response) => {
      response?.forEach(gameSeries => {this.gameSeriesOptions.add(gameSeries)})
    });
    service.getAmiibosSeries().then((response) => {
      response?.forEach(amiiboSeries => {this.amiiboSeriesOptions.add(amiiboSeries)})
    });
  }

  ngOnInit() {
    // Recuperar búsqueda anterior al cargar el componente
    const savedSearch = this.searchService.getResults();
    if (savedSearch.length > 0) {
      const savedPageNumber = this.searchService.getPageNumber();
      const savedAmiibosPerPage = this.searchService.getAmiibosPerPage();

      this.amiibos = savedSearch;
      this.pageNumber = savedPageNumber;
      this.amiibosPerPage = savedAmiibosPerPage;
      this.showButtons = true;
      this.updateAmiibosInPage();
    } else {
      this.searchAmiibo("");
    }
  }

  isLoggedIn = false;

  amiibosFavoritos: string[] = [];
  amiibos:Array<Amiibo> | null=[];
  amiibosInPage:Array<Amiibo> | null=[];
  pageNumber:number = 0;
  amiibosPerPage:number = 10;
  totalAmiibos:number = 100;
  showButtons = false;
  disableButtonsPrevious = true
  disableButtonsNext = true
  filtersButtonText:string = "Mostrar filtros"
  showFiltersInScreen = false

  nameInput:string = "";
  typeInput:string = "";
  gameSeriesInput:string = "";
  amiiboSeriesInput:string = "";
  typesOptions:Set<string> = new Set();
  gameSeriesOptions:Set<string> = new Set();
  amiiboSeriesOptions:Set<string> = new Set();

  showFilters(){
    this.showFiltersInScreen = !this.showFiltersInScreen;
    this.filtersButtonText = this.showFiltersInScreen?"Ocultar filtros":"Mostrar filtros";
  }
  nextPage(){
    this.pageNumber++;
    this.updateAmiibosInPage();
  }
  previousPage(){
    this.pageNumber--;
    this.updateAmiibosInPage();
  }
  firstPage(){
    this.pageNumber=0;
    this.updateAmiibosInPage();
  }
  lastPage(){
    this.pageNumber=Math.ceil(this.totalAmiibos/this.amiibosPerPage-1);
    this.updateAmiibosInPage();
  }

  changeAmiibosPerPage(amiibos:Event){
    // @ts-ignore
    this.amiibosPerPage = parseInt(amiibos.target!["value"]);
    this.pageNumber=0
    this.updateAmiibosInPage()
  }
  searchAmiibo(character:string){
    this.showButtons = true;
    this.pageNumber = 0;
    let filters:string = this.showFiltersInScreen?(this.nameInput==""?"":`&name=${this.nameInput}`)
      +(this.typeInput==""?"":`&type=${this.typeInput}`)
      +(this.gameSeriesInput==""?"":`&gameseries=${this.gameSeriesInput}`)
      +(this.amiiboSeriesInput==""?"":`&amiiboSeries=${this.amiiboSeriesInput}`):"";

    this.service.getAllAmiiboByName(character+filters).then((response) => {
      this.amiibos = response?.sort((a:Amiibo,b:Amiibo) => a.name.localeCompare(b.name))!;
      this.updateAmiibosInPage()
    });
    this.updateButtons();
  }
  updateAmiibosInPage(){
    this.totalAmiibos = this.amiibos!.length;
    this.amiibosInPage = this.amiibos?.slice(this.amiibosPerPage*this.pageNumber,(this.amiibosPerPage*this.pageNumber)+this.amiibosPerPage)!;
    this.searchService.setResults(this.amiibos!);
    this.searchService.setPage(this.pageNumber);
    this.searchService.setAmiibosPerPage(this.amiibosPerPage);
    this.updateButtons()
  }
  updateButtons(){
    this.disableButtonsPrevious = this.pageNumber <= 0;
    this.disableButtonsNext = this.pageNumber >= this.totalAmiibos / this.amiibosPerPage - 1;
  }

  protected readonly Number = Number;
  protected readonly Math = Math;
  protected readonly KeyboardEvent = KeyboardEvent;
}
