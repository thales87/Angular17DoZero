import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { SupplierDto } from '../supplier.dto';
import { lastValueFrom, Observable, of } from 'rxjs';

@Component({
  selector: 'app-suppliers-new',
  standalone: true,
  imports: [
    MaterialModule,
    SuppliersFormComponent,
    AsyncPipe,
    LoadingBarComponent,
  ],
  templateUrl: './suppliers-new.component.html',
  styles: ``,
})
export class SuppliersNewComponent implements OnInit {

  router = inject(Router);
  supplierService = inject(SupplierService);
  supplierObservable!: Observable<SupplierDto>;
  supplier: SupplierDto;

  async ngOnInit() {
    this.supplierObservable = await of(this.supplierService.create());
    this.supplier = await lastValueFrom(this.supplierObservable);
  }

  async onSave(supplier: SupplierDto) {
    this.supplierObservable = this.supplierService.save(supplier);
    const result = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show', result.id]);
  }

  onBack() {
    this.router.navigate(['suppliers']);
  }
}
