const toCamel = (s: string) => {
	return s.replace(/([-_][a-z])/ig, ($1) => {
		return $1.toUpperCase()
			.replace('-', '')
			.replace('_', '');
	});
};

const isArray = function (a: any) {
	return Array.isArray(a);
};

const isObject = function (o: any) {
	return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

/**
 * Converts keys from snake_case to camelCase
 * @param o 
 * @returns new Object
 */
export const keysToCamel = function (o: any) {
	if (isObject(o)) {
		const n: any = {};

		Object.keys(o)
			.forEach((k) => {
				n[toCamel(k)] = keysToCamel(o[k]);
			});

		return n;
	} else if (isArray(o)) {
		return o.map((i: any) => {
			return keysToCamel(i);
		});
	}

	return o;
};