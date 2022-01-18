export interface Collection {
	id?: string;
	name: string;
	tradeable: boolean;
	profileId: string;
	items: CollectionItem[];
}

export interface CollectionItem {
	id: string;
	scryfallId: string
	name: string;
	scryfallUri: string;
	imageUriNormal: string
	colors: string[]
	foil: boolean
	quantity: number
	lang: string
}

export interface CreateItemDto {
	scryfallId: string
	name: string;
	scryfallUri: string;
	imageUriNormal?: string
	colors?: string[]
	foil: boolean
	quantity: number
	lang: string
}

export function createCollection(params: Partial<Collection>) {
	return {

	} as Collection;
}
