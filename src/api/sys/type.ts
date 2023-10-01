/**
 * Login params interface
 */
export interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}


/**
 * Login interface return value
 */
export interface LoginResult {
  status: boolean,
  messgae: string
  access_token: string;
  refresh_token: string;
}

