import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from './product.dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAll(search: string = ''): Observable<ProductDto[]> {
    const searchTerm = search != '' ? '&q=' + search : '';
    return this.http.get<ProductDto[]>(
      environment.api +
        'products?_expand=category&_expand=supplier' +
        searchTerm
    );
  }
}
