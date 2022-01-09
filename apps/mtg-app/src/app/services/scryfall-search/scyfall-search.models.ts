export interface ScryfallSearchState {
	isLoading: boolean;
	searchTerm: string;
	searchResult: any[];
	nextPage: string;
	totalResults?: number;
}

export function createInitialState(): ScryfallSearchState {
	return {
		isLoading: false,
		searchTerm: '',
		searchResult: [],
		nextPage: ''
	};
}
