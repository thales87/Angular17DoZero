import { Category } from "../categories/category.dto";
import { SupplierDto } from "../suppliers/supplier.dto";

export interface ProductDto {
  id?: number;
  supplier?: SupplierDto;
  category?: Category;
  unitPrice: number;
  unitsInStock: number;
  name: string;
  discontinued: Boolean;
}
