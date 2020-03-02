import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], search: string): any {
    if(!value) return []; 
    if(!search) return value;

    search = search.toLowerCase();
        return value.filter( i => {
          return i.brand.toLowerCase().includes(search);
        });
    } // Transform
    
  }


