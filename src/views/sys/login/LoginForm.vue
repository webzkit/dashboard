<template>
  <el-form
    ref="loginFormRef"
    class="login-form"
    autocomplete="on"
    :model="getLoginFormData"
    :rules="getLoginFormRule"
  >
    <div class="title-container">
      <h3 v-html="t('sys.login.title.login')" />
    </div>
    <div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="getLoginFormData.username"
          autocomplete="on"
          :placeholder="t('sys.login.placeholder.username')"
        >
          <template #prefix>
            <el-icon>
              <icon-ep-user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="getLoginFormData.password"
          :type="passwordType"
          autocomplete="on"
          :placeholder="t('sys.login.placeholder.password')"
        >
          <template #prefix>
            <el-icon>
              <icon-ep-lock />
            </el-icon>
          </template>
          <template #suffix>
            <el-icon @click="showPassword">
              <icon-ep-hide v-if="passwordType === 'password'" />
              <icon-ep-view v-else />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </div>

    <div class="flex-bar">
      <el-checkbox v-model="getLoginFormData.remember">{{
        t("sys.login.title.remember")
      }}</el-checkbox>
      <el-link
        type="primary"
        :underline="false"
        @click.prevent="setLoginState(LoginStateEnum.RESET)"
      >
        {{ t("sys.login.title.reset") }}?
      </el-link>
    </div>
    <el-button :loading="loading" type="primary" @click.prevent="handleLogin"
      >{{ t("sys.login.button.login") }}
    </el-button>
    <div class="sub-link">
      <span class="text">{{ t("sys.login.title.not_yet_account") }}</span>
      <el-link
        type="primary"
        :underline="false"
        @click.prevent="setLoginState(LoginStateEnum.REGISTER)"
      >
        {{ t("sys.login.title.register_now") }}
      </el-link>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { getCurrentInstance, nextTick, ref, toRaw } from "vue";
import {
  LoginStateEnum,
  useLoginFormValidate,
  useLoginState,
  useLoginFormRules,
  useLoginFormDatas,
  useLoginHandle,
} from "./handle";

import type { FormInstance } from "element-plus";
import { useI18n } from "/@/hooks/web/useI18n";

const { t } = useI18n();
const { proxy } = getCurrentInstance() as any;

const { setLoginState } = useLoginState();

const loading = ref(false);
const passwordType = ref("password");
const showPassword = () => {
  passwordType.value = passwordType.value === "password" ? "" : "password";
  nextTick(() => {
    proxy.$refs.password.focus();
  });
};

const loginFormRef = ref<FormInstance>();
const { validForm } = useLoginFormValidate(loginFormRef);
const { getLoginFormRule } = useLoginFormRules();
const { getLoginFormData } = useLoginFormDatas();
const { login } = useLoginHandle();

const handleLogin = async () => {
  const data = await validForm();
  if (!data) return;

  login(toRaw(getLoginFormData));
};
</script>
