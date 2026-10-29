import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CatalogAppService } from './catalog-app-service';

describe('CatalogAppService', () => {
  let service: CatalogAppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CatalogAppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getApps calls GET /api/v1/apps', () => {
    service.getApps().subscribe(response => expect(response.data.length).toBe(1));

    const req = httpMock.expectOne('/api/v1/apps');
    expect(req.request.method).toBe('GET');
    req.flush({ data: [{ _id: '1', name: 'Grafana' }] });
  });

  it('getAppDetails calls GET /api/v1/apps/:id/details', () => {
    service.getAppDetails('abc').subscribe();

    const req = httpMock.expectOne('/api/v1/apps/abc/details');
    expect(req.request.method).toBe('GET');
    req.flush({ data: { images: [] } });
  });

  it('deleteApp calls PUT /api/v1/apps/:id', () => {
    service.deleteApp('abc').subscribe(response => expect(response.app_id).toBe('abc'));

    const req = httpMock.expectOne('/api/v1/apps/abc');
    expect(req.request.method).toBe('PUT');
    req.flush({ app_id: 'abc', message: 'deleted' });
  });

  it('addApp calls POST /api/v1/app/new with the request body', () => {
    const request = { data: { url: 'https://x', name: 'X', description: '', images: [] } };
    service.addApp(request).subscribe();

    const req = httpMock.expectOne('/api/v1/app/new');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush({ data: { statusCode: '201', _id: 'new-id' } });
  });
});
