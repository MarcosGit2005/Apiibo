import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { InfoComponent } from './pages/info/info.component';
import { AmiiboDetailsComponent } from './pages/search/amiibo-details/amiibo-details.component'
import {ProfileComponent} from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'info', component: InfoComponent },
  { path: 'amiibo/:head/:tail', component: AmiiboDetailsComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
