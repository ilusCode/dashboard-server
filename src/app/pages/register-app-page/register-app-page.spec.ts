import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterAppPage } from './register-app-page';
import { CatalogAppService } from '../../services/catalog-app-service';

describe('RegisterAppPage', () => {
  const addApp = vi.fn();

  beforeEach(() => {
    addApp.mockReset();
    TestBed.configureTestingModule({
      imports: [RegisterAppPage],
      providers: [provideRouter([]), { provide: CatalogAppService, useValue: { addApp } }],
    });
  });

  it('reads the image types from register-app.yaml', () => {
    const page = TestBed.createComponent(RegisterAppPage).componentInstance;
    expect(page.imageTypes).toEqual(['Icon', 'Banner']);
  });

  it('does not submit an invalid form', () => {
    const page = TestBed.createComponent(RegisterAppPage).componentInstance;

    page.onSubmit();

    expect(addApp).not.toHaveBeenCalled();
    expect(page.form.touched).toBe(true);
  });

  it('submits a valid form and navigates to /home', () => {
    addApp.mockReturnValue(of({ data: { statusCode: '201', _id: 'new' } }));
    const page = TestBed.createComponent(RegisterAppPage).componentInstance;
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    page.form.patchValue({ name: 'Grafana', url: 'https://grafana.local' });
    page.addImage();
    page.images.at(0).setValue({ url: 'https://grafana.local/icon.svg', type: 'icon' });

    page.onSubmit();

    expect(addApp).toHaveBeenCalledWith({
      data: {
        name: 'Grafana',
        url: 'https://grafana.local',
        description: '',
        images: [{ url: 'https://grafana.local/icon.svg', type: 'icon' }],
      },
    });
    expect(navigate).toHaveBeenCalledWith(['/home']);
  });

  it('shows an error message when the API fails', () => {
    addApp.mockReturnValue(throwError(() => new Error('boom')));
    const page = TestBed.createComponent(RegisterAppPage).componentInstance;
    page.form.patchValue({ name: 'Grafana', url: 'https://grafana.local' });

    page.onSubmit();

    expect(page.errorMessage()).not.toBe('');
    expect(page.submitting()).toBe(false);
  });
});
