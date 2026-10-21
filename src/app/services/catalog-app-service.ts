import { inject, Service } from '@angular/core';
import { CatalogAppResponse } from '../model/catalog-app-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppDetailsResponse } from '../model/app-details-response';
import { DeleteAppResponse } from '../model/delete-app-response';

@Service()
export class CatalogAppService {

    private httpClient = inject(HttpClient);

    constructor() { }

    getApps(): Observable<CatalogAppResponse> {
        return this.httpClient.get<CatalogAppResponse>("/api/v1/apps")
    }


    getAppDetails(idApp: string): Observable<AppDetailsResponse> {
        return this.httpClient.get<AppDetailsResponse>("/api/v1/apps/" + idApp + "/details")
    }

    deleteApp(idApp: string): Observable<DeleteAppResponse> {
        return this.httpClient.put<DeleteAppResponse>("/api/v1/apps/" + idApp, null)
    }
}
