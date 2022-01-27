export interface PostgresError {
  query: string;
  driverError: string;
  severity: string;
  detail: string;
  position: string;
  internalQuery: string;
  schema: string;
  column: string;
  constraint: string;
  line: string;
  parameters: string[];
  length: number;
  code: string;
  hint: string;
  internalPosition: string;
  where: string;
  table: string;
  dataType: string;
  file: string;
  routine: string;
}

// export interface DisplayError {
// 	error: string;
// }
// export enum PostgresErrorCodes {
// 	DUPLICATE_COLUMN = '23505' // EX: detail: 'Key (username)=(somename) already exists.',
// }
