import { FormRules } from 'element-plus';
import { computed, reactive, Ref, ref, unref } from 'vue';
import { LoginParams } from '/@/api/sys/type';
import { useI18n } from '/@/hooks/web/useI18n';
import { useUserStore } from '/@/store/modules/user';

export const enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET,
}

const loginState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  const setLoginState = (state: LoginStateEnum) => {
    loginState.value = state;
  };

  const getLoginState = computed(() => loginState.value);

  return {
    setLoginState,
    getLoginState,
  };
}

export function useLoginFormValidate(formRef: Ref<any>) {
  const validForm = async () => {
    const form = unref(formRef);

    if (!form) return;

    return await form.validate((valid: any) => {
      if (!valid) return false;

      return true;
    });
  };

  return { validForm };
}

const min = 6;
const max = 12;

export function useLoginFormDatas() {
  const getLoginFormData = reactive({
    username: 'info@zkit.com',
    password: '123456',
    remember: false,
  });

  return { getLoginFormData };
}

export function useLoginFormRules() {
  const { t } = useI18n();

  const getUsernameFormRule = computed(() =>
    createRule(t('sys.login.validate.username')),
  );
  const getPasswordFormRule = computed(() =>
    createMinMaxRule(
      t('sys.login.validate.password'),
      t('sys.login.validate.minMaxPassword', [min, max] as Recordable),
      min,
      max,
    ),
  );

  const getLoginFormRule = reactive(<FormRules>{
    username: unref(getUsernameFormRule),
    password: unref(getPasswordFormRule),
  });

  return { getLoginFormRule };
}

export function useLoginHandle() {
  const userStore = useUserStore();

  const login = async (formData: LoginParams) => {
    userStore.login(formData);
  };

  const register = () => {
    console.log('Register');
  };

  const reset = () => {
    console.log('Reset');
  };

  return { login, register, reset };
}

const createRule = (message: string) => {
  return [{ required: true, trigger: 'blur', message }];
};

const createMinMaxRule = (
  message: string,
  minMaxMessage: string,
  min: number = 6,
  max: number = 18,
) => {
  return [
    { required: true, trigger: 'blur', message },
    { min, max, trigger: 'blue', message: minMaxMessage },
  ];
};
