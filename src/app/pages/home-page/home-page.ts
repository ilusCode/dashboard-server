import { Component, OnInit } from '@angular/core';
import { CatalogAppService } from '../../services/catalog-app-service';
import { CatalogAppResponse } from '../../model/catalog-app-response';
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
        this.catalogApps.push(...response.data);
      });
  }
}
