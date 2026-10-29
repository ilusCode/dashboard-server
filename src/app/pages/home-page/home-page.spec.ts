import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { HomePage } from './home-page';
import { CatalogAppService } from '../../services/catalog-app-service';

describe('HomePage', () => {
  const catalogAppService = {
    getApps: vi.fn(),
    getAppDetails: vi.fn(),
    deleteApp: vi.fn(),
  };

  beforeEach(() => {
    catalogAppService.getApps.mockReturnValue(of({
      data: [
        { _id: '1', name: 'Grafana', url: '', description: '', iconImage: '' },
        { _id: '2', name: 'Kibana', url: '', description: '', iconImage: '' },
      ],
    }));
    catalogAppService.getAppDetails.mockImplementation((id: string) => of({
      data: { images: [{ _id: 'i', type: 'icon', url: `https://img/${id}.png`, datetime: '' }] },
    }));
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([]), { provide: CatalogAppService, useValue: catalogAppService }],
    });
  });

  it('loads the apps and fills each icon from its details', () => {
    const page = TestBed.createComponent(HomePage).componentInstance;

    page.loadApps();

    expect(page.catalogApps().map(app => app.iconImage)).toEqual(['https://img/1.png', 'https://img/2.png']);
  });

  it('removes a deleted app and shows the success message', () => {
    const page = TestBed.createComponent(HomePage).componentInstance;
    page.loadApps();

    page.removeApp('1');

    expect(page.catalogApps().map(app => app._id)).toEqual(['2']);
    expect(page.deletedMessage()).toContain('Grafana');
    page.closeDeletedMessage();
    expect(page.deletedMessage()).toBe('');
  });
});
