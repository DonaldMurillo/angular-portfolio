export interface ScryfallSearchState {
	isLoading: boolean;
	searchTerm: string;
	searchResult: ScryfallCard[];
	nextPage: string | null;
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

export interface ScryfallSearchResponse {
	object: string;
	totalCards: number;
	hasMore: boolean;
	nextPage: string;
	data: ScryfallCard[];
}

export interface ScryfallCard {
	object: string;
	id: string;
	oracleId: string;
	multiverseIds: number[];
	mtgoId?: number;
	arenaId?: number;
	tcgplayerId?: number;
	cardmarketId?: number;
	name: string;
	lang: string;
	releasedAt: string;
	uri: string;
	scryfallUri: string;
	layout: string;
	highresImage: boolean;
	imageStatus: string;
	imageUris?: ImageUris;
	manaCost?: string;
	cmc: number;
	typeLine: string;
	oracleText?: string;
	colors?: string[];
	colorIdentity: string[];
	keywords: string[];
	legalities: Legalities;
	games: string[];
	reserved: boolean;
	foil: boolean;
	nonfoil: boolean;
	finishes: string[];
	oversized: boolean;
	promo: boolean;
	reprint: boolean;
	variation: boolean;
	setId: string;
	set: string;
	setName: string;
	setType: string;
	setUri: string;
	setSearchUri: string;
	scryfallSetUri: string;
	rulingsUri: string;
	printsSearchUri: string;
	collectorNumber: string;
	digital: boolean;
	rarity: string;
	flavorText?: string;
	cardBackId?: string;
	artist: string;
	artistIds: string[];
	illustrationId?: string;
	borderColor: string;
	frame: string;
	fullArt: boolean;
	textless: boolean;
	booster: boolean;
	storySpotlight: boolean;
	edhrecRank?: number;
	prices: Prices;
	relatedUris: RelatedUris;
	purchaseUris: PurchaseUris;
	power?: string;
	toughness?: string;
	allParts?: AllPart[];
	frameEffects?: string[];
	securityStamp?: string;
	preview?: Preview;
	mtgoFoilId?: number;
	watermark?: string;
	producedMana?: string[];
	cardFaces?: CardFace[];
	loyalty?: string;
}

interface CardFace {
	object: string;
	name: string;
	manaCost: string;
	typeLine: string;
	oracleText: string;
	colors: (string | string)[];
	flavorText?: string;
	artist: string;
	artistId: string;
	illustrationId: string;
	imageUris: ImageUris;
	flavorName?: string;
	power?: string;
	toughness?: string;
	colorIndicator?: string[];
	loyalty?: string;
}

interface Preview {
	source: string;
	sourceUri: string;
	previewedAt: string;
}

interface AllPart {
	object: string;
	id: string;
	component: string;
	name: string;
	typeLine: string;
	uri: string;
}

interface PurchaseUris {
	tcgplayer: string;
	cardmarket: string;
	cardhoarder: string;
}

interface RelatedUris {
	gatherer?: string;
	tcgplayerInfiniteArticles: string;
	tcgplayerInfiniteDecks: string;
	edhrec: string;
	mtgtop8: string;
}

interface Prices {
	usd?: string;
	usdFoil?: string;
	usdEtched?: any;
	eur?: string;
	eurFoil?: string;
	tix?: string;
}

interface Legalities {
	standard: string;
	future: string;
	historic: string;
	gladiator: string;
	pioneer: string;
	modern: string;
	legacy: string;
	pauper: string;
	vintage: string;
	penny: string;
	commander: string;
	brawl: string;
	historicbrawl: string;
	alchemy: string;
	paupercommander: string;
	duel: string;
	oldschool: string;
	premodern: string;
}

interface ImageUris {
	small: string;
	normal: string;
	large: string;
	png: string;
	artCrop: string;
	borderCrop: string;
}