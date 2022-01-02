export interface UserState {
	id: string | null;
	nickname: string;
	avatarImage: ArrayBuffer | null;
	showTrades: boolean;
	theme: string;
}

export function createInitialState(): UserState {
	return {
		id: null,
		nickname: '',
		avatarImage: null,
		showTrades: false,
		theme: '',
	}
};
