import { Component, OnInit } from '@angular/core';
import { CatalogAppService } from '../../services/catalog-app-service';
import { CatalogAppResponse } from '../../model/catalog-app-response';

@Component({
  imports: [],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {

  constructor(private catalogAppService: CatalogAppService) { }
  title = 'Dashboard Server';
  catalogApps: CatalogAppResponse[] = [];

  ngOnInit(): void {
    this.catalogAppService.getApps()
      .then(apps => {
        this.catalogApps.push(...apps);
        console.log('Apps fetched successfully:', this.catalogApps);
      });
  }
}
