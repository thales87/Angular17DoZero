import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../cart.service';

interface MenuItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MenuComponent,
    CategoriesComponent,
    RouterOutlet,
    RouterModule,
    MatBadgeModule
  ],
})
export class HomeComponent {
  menuItems: Array<MenuItem> = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/categories',
      label: 'Categories',
    },
    {
      path: '/suppliers',
      label: 'Suppliers',
    },
  ];

  private breakpointObserver = inject(BreakpointObserver);
  cartService = inject(CartService);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
