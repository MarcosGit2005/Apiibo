import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { InfoComponent } from './pages/info/info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AmiiboComponent } from './pages/search/amiibo/amiibo.component';
import {FormsModule} from '@angular/forms';
import { AmiiboDetailsComponent } from './pages/search/amiibo-details/amiibo-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    InfoComponent,
    AmiiboComponent,
    AmiiboDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
