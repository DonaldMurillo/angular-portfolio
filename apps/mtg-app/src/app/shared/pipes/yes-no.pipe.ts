import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

	transform(value: boolean, args: 'upper' | 'proper' | 'lower'): string | undefined {
		const val = value ? 'Yes' : 'No';
		if (args === 'proper') return val;
		else if (args === 'lower') return val.toLowerCase();
		else if (args === 'upper') return val.toUpperCase();
		else return undefined 
	}

}
