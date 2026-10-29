import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApplicationCard } from './application-card';
import { CatalogAppService } from '../../services/catalog-app-service';

describe('ApplicationCard', () => {
  const deleteApp = vi.fn();

  beforeEach(() => {
    deleteApp.mockReset();
    TestBed.configureTestingModule({
      imports: [ApplicationCard],
      providers: [{ provide: CatalogAppService, useValue: { deleteApp } }],
    });
  });

  it('emits appDeleted when the API confirms the deletion', () => {
    deleteApp.mockReturnValue(of({ app_id: '1', message: 'deleted' }));
    const card = TestBed.createComponent(ApplicationCard).componentInstance;
    const emitted: string[] = [];
    card.appDeleted.subscribe(id => emitted.push(id));

    card.deleteApplication('1');

    expect(deleteApp).toHaveBeenCalledWith('1');
    expect(emitted).toEqual(['1']);
  });

  it('does not emit appDeleted when the API returns another id', () => {
    deleteApp.mockReturnValue(of({ app_id: 'other', message: '' }));
    const card = TestBed.createComponent(ApplicationCard).componentInstance;
    const emitted: string[] = [];
    card.appDeleted.subscribe(id => emitted.push(id));

    card.deleteApplication('1');

    expect(emitted).toEqual([]);
  });

  it('replaces a broken image with the fallback image', () => {
    const card = TestBed.createComponent(ApplicationCard).componentInstance;
    const img = document.createElement('img');
    img.src = 'https://broken.example/icon.png';

    card.onImageError({ target: img } as unknown as Event);

    expect(img.src.endsWith(card.fallbackImage)).toBe(true);
  });
});
