import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarHome } from '../../components/navbar-home/navbar-home';
import { NewAppRequest } from '../../model/new-app-request';
import { CatalogAppService } from '../../services/catalog-app-service';
import { registerAppConfig } from '../../interfaces/register-app-config';

@Component({
  imports: [NavbarHome, RouterLink, ReactiveFormsModule],
  selector: 'app-register-app-page',
  styleUrl: './register-app-page.css',
  templateUrl: './register-app-page.html',
})
export class RegisterAppPage {
  title = 'Register new application';
  imageTypes = registerAppConfig.imageTypes;

  submitting = signal(false);
  errorMessage = signal('');

  private fb = inject(FormBuilder);
  private catalogAppService = inject(CatalogAppService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    url: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    images: this.fb.array<ReturnType<RegisterAppPage['createImageGroup']>>([]),
  });

  get images(): FormArray {
    return this.form.controls.images;
  }

  createImageGroup() {
    return this.fb.nonNullable.group({
      url: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  addImage(): void {
    this.images.push(this.createImageGroup());
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  isInvalid(path: string): boolean {
    const control = this.form.get(path);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: NewAppRequest = { data: this.form.getRawValue() };
    this.submitting.set(true);
    this.errorMessage.set('');

    this.catalogAppService.addApp(request)
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => {
          this.errorMessage.set('The application could not be registered. Please try again.');
          this.submitting.set(false);
        },
      });
  }
}
