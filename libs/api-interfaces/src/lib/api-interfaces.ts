export interface Message {
  message: string;
}

export interface JwtPayload {
  username: string;
  userType: string;
  // isCustomer: boolean;
  // isCompany: boolean;
  userId?: string;
}
