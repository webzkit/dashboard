import { BasicKeys, Persistent } from '../cache/persistent';
import {
  ACCESS_TOKEN_KEY,
  CacheTypeEnum,
  REFRESH_TOKEN_KEY,
} from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';

const { userCacheType } = projectSetting;
const isLocal = userCacheType === CacheTypeEnum.LOCAL;

export function getAccessToken() {
  return getAuthCache(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return getAuthCache(REFRESH_TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;

  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value: any) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;

  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
