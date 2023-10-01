export type ErrorMessageMode = 'alert' | 'notification' | 'message' | 'message_box';


export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

