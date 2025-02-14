import {Component, ViewChild} from '@angular/core';
import {Amiibo} from '../../../model/Amiibo';
import {AmiiboApiServiceService} from '../../../amiibo-api-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  constructor(private router:Router, private service:AmiiboApiServiceService) {
    service.getAmiibosTypes().then((response) => {
      response?.forEach(type => {this.typesOptions.add(type)})
    });
    service.getAmiibosGameSeries().then((response) => {
      response?.forEach(gameSeries => {this.gameSeriesOptions.add(gameSeries)})
    })
  }
  amiibos:Array<Amiibo> | null=[];
  amiibosInPage:Array<Amiibo> | null=[];
  pageNumber:number = 0;
  amiibosPerPage:number = 14;
  totalAmiibos:number = 100;
  showButtons = false;
  disableButtonsPrevious = true
  disableButtonsNext = true
  filtersButtonText:string = "Mostrar filtros"
  showFiltersInScreen = false

  nameInput:string = "";
  typeInput:string = "";
  gameSeriesInput:string = "";
  typesOptions:Set<string> = new Set();
  gameSeriesOptions:Set<string> = new Set();

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
    this.amiibosPerPage = <number>(amiibos.target!["value"]);
    this.pageNumber=0
    this.updateAmiibosInPage()
  }
  searchAmiibo(character:string){
    this.showButtons = true;
    this.pageNumber = 0;
    let filters:string = this.showFiltersInScreen?(this.nameInput==""?"":`&name=${this.nameInput}`)
      +(this.typeInput==""?"":`&type=${this.typeInput}`)
      +(this.gameSeriesInput==""?"":`&gameseries=${this.gameSeriesInput}`):"";

    this.service.getAllAmiiboByName(character+filters).then((response) => {
      this.amiibos = response?.sort((a:Amiibo,b:Amiibo) => a.name.localeCompare(b.name))!;
      this.totalAmiibos = this.amiibos.length;
      this.updateAmiibosInPage()
    });
    this.updateButtons();
  }
  updateAmiibosInPage(){
    this.amiibosInPage = this.amiibos?.slice(this.amiibosPerPage*this.pageNumber,this.amiibosPerPage*this.pageNumber+this.amiibosPerPage)!;
    this.updateButtons()
  }
  updateButtons(){
    this.disableButtonsPrevious = this.pageNumber <= 0;
    this.disableButtonsNext = this.pageNumber >= this.totalAmiibos / this.amiibosPerPage - 1;
  }
  goToDetails(){
    this.router.navigate(['/amiibo/1']);
  }

  protected readonly Number = Number;
}
