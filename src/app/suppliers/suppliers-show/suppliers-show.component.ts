import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingBarComponent } from '../../loading-bar.component';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { SupplierService } from '../supplier.service';
import { SupplierDto } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-suppliers-show',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink],
  templateUrl: './suppliers-show.component.html',
  styles: ``,
})

export class SuppliersShowComponent implements OnInit {

  route = inject(ActivatedRoute);
  supplierService = inject(SupplierService);
  supplier: SupplierDto;
  supplierObservable: Observable<SupplierDto>;

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
    console.log(this.supplier);
  }

}
