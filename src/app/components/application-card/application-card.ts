import { Component, Input } from '@angular/core';
import { CatalogAppDataResponse } from '../../model/catalog-app-data-response';

@Component({
  imports: [],
  selector: 'app-application-card',
  styleUrl: './application-card.css',
  templateUrl: './application-card.html',
})
export class ApplicationCard {

    @Input() appDetail: CatalogAppDataResponse = new CatalogAppDataResponse();

}
