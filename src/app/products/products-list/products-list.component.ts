import { Component, inject, OnInit } from '@angular/core';
import { LoadingBarComponent } from '../../loading-bar.component';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductDto } from '../product.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { CartService } from '../../cart.service';
import { CartDto } from '../../cart.dto';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, CurrencyPipe],
  templateUrl: './products-list.component.html',
  styles: ``,
})
export class ProductsListComponent implements OnInit {
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  cartService = inject(CartService);
  products: ProductDto[];
  productsObservable: Observable<ProductDto[]>;
  searchForm: FormGroup;
  async ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
    this.getProducts();
  }
  private async getProducts(searchTerm?: string) {
    this.productsObservable = this.productService.getAll(searchTerm);
    this.products = await lastValueFrom(this.productsObservable);
  }
  onSearch() {
    this.getProducts(this.searchForm.value.searchTerm);
  }
  onAddToCart(item: ProductDto) {
    const cartItem: CartDto = {
      idProduct: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: item.unitPrice,
    };
    this.cartService.addItem(cartItem);
  }
}
