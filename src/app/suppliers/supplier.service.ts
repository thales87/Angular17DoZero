import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierDto } from './supplier.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(environment.api + 'suppliers');
  }

  public getById(id: Number): Observable<SupplierDto> {
    return this.http.get<SupplierDto>(environment.api + 'suppliers/' + id);
  }

  public save(supplier: SupplierDto): Observable<SupplierDto> {
    if (supplier.id)
      return this.http.put<SupplierDto>(
        environment.api + 'suppliers/' + supplier.id,
        supplier
      );
    return this.http.post<SupplierDto>(environment.api + 'suppliers', supplier);
  }

  public delete(id?: number): Observable<SupplierDto> {
    return this.http.delete<SupplierDto>(environment.api + 'suppliers/' + id);
  }

  public create(): SupplierDto {
    return {
      id: 0,
      companyName: '',
      contactName: '',
      contactTitle: '',
      address: {
        city: '',
        phone: '',
        country: '',
        postalCode: 0,
        region: '',
        street: '',
      },
    };
  }
}
