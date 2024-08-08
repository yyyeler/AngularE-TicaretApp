import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../data/product';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], filterText: string): Product[] 
  {
    return filterText?
           value.filter(p => p.name!.toLocaleLowerCase().indexOf(filterText) !== -1):
           value;
  }

}
