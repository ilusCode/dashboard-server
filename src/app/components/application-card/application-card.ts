import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogAppDataResponse } from '../../model/catalog-app-data-response';
import { CatalogAppService } from '../../services/catalog-app-service';

@Component({
  imports: [],
  selector: 'app-application-card',
  styleUrl: './application-card.css',
  templateUrl: './application-card.html',
})
export class ApplicationCard {

  constructor(private catalogAppService: CatalogAppService) { }

  @Input() appDetail: CatalogAppDataResponse = new CatalogAppDataResponse();

  @Output() appDeleted = new EventEmitter<string>();

  deleteApplication(appId: string): void {
    this.catalogAppService.deleteApp(appId).subscribe(response => {
      if (response.app_id === appId) {
        console.log(`Application with ID ${appId} deleted successfully.`);
        this.appDeleted.emit(appId);
      } else {
        console.error(`Failed to delete application with ID ${appId}.`);
      }
    });
  }
}
