import { Component, Input } from '@angular/core';
import { Brewery } from 'src/app/models/brewery';

@Component({
  selector: 'app-brewery-card',
  templateUrl: './brewery-card.component.html',
  styleUrls: ['./brewery-card.component.scss']
})
export class BreweryCardComponent {

  @Input() brewery?: Brewery;

}
