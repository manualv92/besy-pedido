import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'itemFilter',
    pure: false
})

export class ItemFilter implements PipeTransform {
  	transform(items: Array<any>, params: string) {
		return items.filter(item => item.denominacion.toLowerCase().indexOf(params.toLowerCase()) > -1 );
	}
}