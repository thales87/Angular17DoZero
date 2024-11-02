import { AddressDto } from '../address/address.dto';

export interface SupplierDto {
  id?: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: AddressDto;
}
