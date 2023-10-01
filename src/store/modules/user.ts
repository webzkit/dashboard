import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import type { UserInfo } from "/#/store";
import { LoginParams } from "/@/api/sys/type";
import { getUserInfo, loginApi, logoutApi } from "/@/api/sys/user";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_INFO_KEY } from "/@/enums/cacheEnum";
import { router } from "/@/router";
import { DASHBOARD_NAME_ROUTE, LOGIN_NAME_ROUTE } from "/@/router/constant";
import { getAuthCache, setAuthCache } from "/@/utils/auth";

interface UserState {
  info: Nullable<UserInfo>;
  accessToken?: string;
  refreshToken?: string;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}


export const useUserStore = defineStore({
  id: 'app-user',

  state: (): UserState => ({
    info: null,
    accessToken: undefined,
    refreshToken: undefined,
    sessionTimeout: false,
    lastUpdateTime: 0
  }),

  getters: {
    getInfo(): UserInfo {
      return this.info || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },

    getAccessToken(): string {
      return this.accessToken || getAuthCache<string>(ACCESS_TOKEN_KEY);
    },

    getRefreshToken(): string {
      return this.refreshToken || getAuthCache<string>(REFRESH_TOKEN_KEY);
    },

    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },

    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },

  actions: {
    setAccessToken(info: string | undefined) {
      this.accessToken = info ? info : '';

      setAuthCache(ACCESS_TOKEN_KEY, info);
    },

    setRefreshToken(info: string | undefined) {
      this.refreshToken = info ? info : '';

      setAuthCache(REFRESH_TOKEN_KEY, info);
    },

    setInfo(info: UserInfo | null) {
      this.info = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },

    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },

    async login(parrams: LoginParams) {
      try {
        await loginApi(parrams).then(response => {
          if (response.data.status) {
            this.setAccessToken(response.data.access_token);
            this.setRefreshToken(response.data.refresh_token);

            ElNotification.success({
              title: 'Notification',
              message: response.data.message || 'Notification',
              duration: 3000,
              position: 'bottom-right'
            });

            this.afterLogin();
            return router.push({ name: DASHBOARD_NAME_ROUTE });
          }
        }).catch(error => {
          console.log(error)
        });
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async logout() {
      if (this.getAccessToken) {
        try {
          await logoutApi().then(res => {
            if (res.data.status) {
              this.setInfo(null);
              this.setAccessToken(undefined);
              this.setRefreshToken(undefined);
              this.setSessionTimeout(false);

              return router.push({ name: LOGIN_NAME_ROUTE })
            }
          }).catch(err => {
            console.log(err)
          })
        } catch {
          console.log('Error Token')
        }
      }
    },

    async afterLogin() {
      if (!this.getAccessToken) return null;

      const userInfo = await this.fetchUserInfo();
      const sessionTimeout = this.sessionTimeout;

      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        // check permission next task
      }

      const { id, full_name, email } = userInfo;
      this.setInfo({ id, full_name, email });

      return userInfo;
    },

    async fetchUserInfo() {
      if (!this.getAccessToken) return null;
      const userInfo = await getUserInfo().then(response => {
        return response.data.item;
      }).catch(error => {
        console.log(error)
      });

      return userInfo;
    },

    resetState() {
      this.info = null;
      this.accessToken = '';
      this.refreshToken = '';
      this.sessionTimeout = false;
    },
  }
});

