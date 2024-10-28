import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { MatCardModule } from '@angular/material/card';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBarComponent } from '../loading-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }

  `,
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    CategoryFormComponent,
    MatIconModule,
    LoadingBarComponent,
    MatProgressBarModule
  ],
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;

  showForm: Boolean = false;
  category!: Category;
  dataSource = new MatTableDataSource<Category>();
  showLoading: Boolean = false;

  constructor(private categoryService: CategoryService) {}

  displayedColumns = ['id', 'name', 'description', 'actions'];

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }

  hideCategoryForm() {
    this.showForm = false;
    this.loadCategories();
  }

  onSave(category: Category) {
    this.showLoading = true;
    const saved = lastValueFrom(this.categoryService.save(category));
    this.showLoading = false;
    this.hideCategoryForm();
    this.loadCategories();
  }

  onNewCategoryClick() {
    this.category = {
      id: 0,
      name: '',
      description: '',
    };
    this.showForm = true;
  }

  onEditCategoryClick(category: Category) {
    this.showForm = true;
    this.category = category;
  }

  async onDeleteCategoryClick(category: Category) {
    if (confirm(`Deletar "${category.name}" com id ${category.id} ?`)) {
      this.showLoading = true;
      await lastValueFrom(this.categoryService.delete(category.id));
      this.showLoading = false;
      this.loadCategories();
    }
  }
}
