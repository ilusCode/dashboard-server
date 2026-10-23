import { Component, OnInit, signal } from '@angular/core';
import { CatalogAppService } from '../../services/catalog-app-service';
import { CatalogAppDataResponse } from '../../model/catalog-app-data-response';
import { ApplicationCard } from '../../components/application-card/application-card';
import { NoApplications } from '../../components/no-applications/no-applications';
import { NavbarHome } from '../../components/navbar-home/navbar-home';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ApplicationCard, NoApplications, NavbarHome, RouterLink],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {

  constructor(private catalogAppService: CatalogAppService) { }
  title = 'Dashboard Server';
  catalogApps = signal<CatalogAppDataResponse[]>([]);

  ngOnInit(): void {
    this.loadApps();
  }

  loadApps(): void {
    this.catalogAppService.getApps()
      .subscribe(response => {
        this.catalogApps.set(response.data);
        response.data.forEach(app => {
          this.catalogAppService.getAppDetails(app._id)
          .subscribe(responseDetails => {
            const iconImage = responseDetails.data.images.find(it => it.type == "icon")?.url ?? ""
            this.catalogApps.update(apps => apps.map(it => it._id === app._id ? { ...it, iconImage } : it));
          })
        });
      });
  }

  removeApp(appId: string): void {
    this.catalogApps.update(apps => apps.filter(it => it._id !== appId));
  }
}
