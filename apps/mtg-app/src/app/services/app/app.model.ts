import { MenuItem } from "primeng/api";

export type AppTheme = 'light' | 'dark'

export interface AppState {
	theme: AppTheme;
}

export function createInitialState(): AppState {
	return {
		theme: 'light'
	};
}
