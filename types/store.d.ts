// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

export interface UserInfo {
  id: string | number;
  email: string;
  full_name: string;
  avatar?: string;
}

export interface BeforeMiniState {}
