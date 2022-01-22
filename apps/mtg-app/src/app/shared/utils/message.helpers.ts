import { HttpErrorResponse } from "@angular/common/http";
import { Message } from "primeng/api";

export function createSuccessMessage(detail: string, summary: string = 'Action Successul'): Message {
	return { key: 'tc', severity: 'success', summary: summary, detail: detail };
}

export function createErrorMessage(error: HttpErrorResponse, summary: string = 'An Error Occurred'): Message {
	return { key: 'tc', severity: 'error', summary: summary, detail: error.error.message };
}