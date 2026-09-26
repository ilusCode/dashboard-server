import { Component, OnInit } from '@angular/core';
import { CatalogAppService } from '../../services/catalog-app-service';
import { CatalogAppDataResponse } from '../../model/catalog-app-data-response';

@Component({
  imports: [],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {

  constructor(private catalogAppService: CatalogAppService) { }
  title = 'Dashboard Server';
  catalogApps: CatalogAppDataResponse[] = [];

  ngOnInit(): void {
    this.catalogAppService.getApps()
      .subscribe(response => {
        response.data.forEach(app => {
          this.catalogAppService.getAppDetails(app._id)
          .subscribe(responseDetails => {
            app.iconImage = responseDetails.data.images.filter(it=>it.type =="icon")[0].url
          })
          this.catalogApps.push(app);
        });
      });
  }
}
