import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category.dto';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    MaterialModule
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
