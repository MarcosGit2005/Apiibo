import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-amiibo',
  standalone: false,
  templateUrl: './amiibo.component.html',
  styleUrl: './amiibo.component.css'
})
export class AmiiboComponent {
  @Input() amiibo:any;
}
