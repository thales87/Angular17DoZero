import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SupplierDto } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { LoadingBarComponent } from '../../loading-bar.component';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-suppliers-delete',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink],
  templateUrl: './suppliers-delete.component.html',
  styles: ``,
})
export class SuppliersDeleteComponent implements OnInit {
  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  supplier!: SupplierDto;
  supplierObservable!: Observable<SupplierDto>;
  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
  }

  async confirmDelete() {
    this.supplierObservable = this.supplierService.delete(this.supplier.id);
    await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers']);
  }
}
