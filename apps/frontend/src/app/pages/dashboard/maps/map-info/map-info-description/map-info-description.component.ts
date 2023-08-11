import { Component, Input } from '@angular/core';
import { MMap } from '@momentum/constants';

@Component({
  selector: 'mom-map-info-description',
  templateUrl: './map-info-description.component.html',
  styleUrls: ['./map-info-description.component.scss']
})
export class MapInfoDescriptionComponent {
  @Input() map: MMap;
}
