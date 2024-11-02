import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { SupplierDto } from '../../supplier.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier-card',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './supplier-card.component.html',
  styles: ''
})
export class SupplierCardComponent {
  @Input({required: true}) supplier: SupplierDto
}
