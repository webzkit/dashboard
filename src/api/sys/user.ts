import { LoginParams } from "./type";
import request from '/@/utils/http/axios/index';
import qs from "qs";
import { ContentTypeEnum, RequestEnum } from "/@/enums/httpEnum";


enum Api {
  LOGIN = '/oauth/login',
  LOGOUT = '/oauth/logout',
  ME = '/oauth/me',
}


export function loginApi(params: LoginParams) {
  return request({
    url: Api.LOGIN,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    data: qs.stringify(params)
  });
}

export function logoutApi() {
  return request({
    url: Api.LOGOUT,
    method: RequestEnum.POST
  });
}

export const getUserInfo = () => {
  return request({
    url: Api.ME,
    method: RequestEnum.GET,
  });
}

