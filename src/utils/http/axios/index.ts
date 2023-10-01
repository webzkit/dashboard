import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElNotification } from "element-plus";
import { isUndefined } from "lodash-es";
import { ContentTypeEnum } from "/@/enums/httpEnum";
import { useGlobSetting } from "/@/hooks/setting";
import { useUserStore } from "/@/store/modules/user";


const { apiUrl, urlPrefix } = useGlobSetting();
const baseURL = `${apiUrl}${urlPrefix}`;

const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": ContentTypeEnum.JSON
  }
});


service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore();
    if (!isUndefined(userStore.getAccessToken)) {
      // @ts-ignore
      config.headers['Authorization'] = `Bearer ${userStore.getAccessToken}`;
    }

    return config;
  }, (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  }
);


service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.status) {
      return response;
    }

    showError(res);
    return Promise.reject(res);
  },
  (error: AxiosError) => {
    // @ts-ignore
    const badMessage: any = error.response.data.detail || error.message || error
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''))
    showError({ code, message: badMessage });

    return Promise.reject(error);
  }
);

function showError(error: any) {
  if (error.code === 403) {
    // re-login
    const userStore = useUserStore();
    return userStore.logout();
  }

  ElNotification({
    title: error.title || 'Title',
    type: 'error',
    message: error.detail || error.message || 'service exception.',
    duration: 30000,
  })
}


export default service;
