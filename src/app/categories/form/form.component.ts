import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../category.dto';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class CategoryFormComponent {
  constructor(private fb: FormBuilder) {}

  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter<Category>();
  @Input()
  set category(category: Category) {
    this.categoryForm.setValue(category);
  }
  categoryForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
  });

  onBack() {
    this.back.emit();
  }

  onSubmit() {
    this.save.emit(this.categoryForm.value as Category);
  }
}
