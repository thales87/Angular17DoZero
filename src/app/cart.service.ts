import { Injectable } from '@angular/core';
import { CartDto } from './cart.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly CART: string = 'cart';
  readonly CART_QUANTITY: string = 'cart_quantity';

  public getItems(): Array<CartDto> {
    const cartItems = localStorage.getItem(this.CART);
    if (cartItems.length>0) {
      console.log(JSON.parse(cartItems));
      return JSON.parse(cartItems);
    }
    return new Array<CartDto>;
  }

  public addItem(item: CartDto): void {
    let found = false;
    const items = this.getItems();
    if(items.length > 0){
      items.forEach(element => {
        if (element.idProduct === item.idProduct) {
          element.quantity++;
          found = true;
        }
      });
    }
    if (!found) {
      items.push(item);
    }
    localStorage.setItem(this.CART, JSON.stringify(items));
    localStorage.setItem(this.CART_QUANTITY, items.length.toString());
  }

  public removeItem(item: CartDto): void {
    let found = false;
    const items = this.getItems();


    items.forEach(element => {
      if (element.idProduct === item.idProduct) {
        element.quantity--;
        found = true;
      }
    });
    const newItens = items.filter(element => element.quantity > 0);
    localStorage.setItem(this.CART, JSON.stringify(newItens));
    localStorage.setItem(this.CART_QUANTITY, newItens.length.toString());
  }

  get itensInCart(): number {
    return this.getItems().length;
  }

  get total(): number {
    let total = 0;
    const items = this.getItems();
    items.forEach(element => {
      total += (element.unitPrice * element.quantity);
    });
    return total;
  }
}
