<template>
    <div id="login-page">
        <div class="login-header">
            <span class="item" @click="changeColorSchema" v-if="getEnableColorSchema">
                <el-icon>
                    <icon-ep-sunny v-if="getColorSchema === ThemeEnum.LIGHT" />
                    <icon-ep-moon v-else />
                </el-icon>
            </span>
            <span class="item" v-if="getShowLocalePicker">
                <Locale />
            </span>
        </div>
        <div class="bg-banner" />
        <div id="login-box">
            <div class="login-banner">
                <img class="banner" :src="banner" />
            </div>

            <LoginForm v-if="LoginStateEnum.LOGIN === getLoginState" />
            <RegisterForm v-else-if="LoginStateEnum.REGISTER === getLoginState" />
            <ResetForm v-else-if="LoginStateEnum.RESET === getLoginState" />
        </div>

        <Foolter v-if="getEnableCopyright" />
    </div>
</template>

<script lang="ts" setup>
import { useFooterSetting } from "/@/hooks/setting/useFooterSetting";
import Foolter from "/@/layouts/default/components/Foolter/index.vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import ResetForm from "./ResetForm.vue";
import { useLoginState, LoginStateEnum } from "./handle";
import Locale from "/@/layouts/default/components/Tools/Locale.vue";
import { unref } from "vue";
import { ThemeEnum } from "/@/enums/appEnum";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
import { useLocale } from "/@/locales/useLocale";

const { getEnableCopyright } = useFooterSetting();
const banner = new URL("../../../assets/images/login-box-bg-profile.svg", import.meta.url).href;

const { getLoginState } = useLoginState();
const { setAppSetting, getColorSchema } = useAppSetting();
const { getEnableColorSchema } = useHeaderSetting();
const {  getShowLocalePicker } = useLocale();

const changeColorSchema = function () {
    setAppSetting({ colorSchema: unref(getColorSchema) === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK });
};
</script>

<style lang="scss">
[data-mode="mobile"] {
    #login-page {
        #login-box {
            position: relative;
            width: 100%;
            height: 100%;
            top: inherit;
            left: inherit;
            transform: translateX(0) translateY(0);
            flex-direction: column;
            justify-content: start;
            border-radius: 0;
            box-shadow: none;

            .login-banner {
                width: 100%;
                padding: 20px 0;

                .banner {
                    position: relative;
                    right: inherit;
                    width: 100%;
                    max-width: 375px;
                    margin: 0 auto;
                    display: inherit;
                    top: inherit;
                    transform: translateY(0);
                }
            }

            .login-form {
                width: 100%;
                min-height: auto;
                padding: 30px;
            }
        }

        .copyright {
            position: relative;
            bottom: 0;
            padding-bottom: 10px;
        }
    }
}

#login-page {
    width: 100%;
    height: 100%;

    :deep(input[type="password"]::-ms-reveal) {
        display: none;
    }

    .login-header {
        position: absolute;
        top: 10px;
        right: 10px;
        text-align: right;
        width: 100%;
        height: auto;
        z-index: 1000000;

        span.item {
            padding-left: 0.4rem;

            &:first {
                padding-left: 0;
            }

            .el-icon {
                font-size: 22px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .bg-banner {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        background: transparent url("/src/assets/images/login-bg.svg") no-repeat;
        background-size: auto 100%;
    }

    #login-box {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        overflow: hidden;

        .login-banner {
            position: relative;
            width: 450px;

            .banner {
                width: calc(100% + 100px);
                right: -50px;
                @include position-center(y);
            }
        }

        .login-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 500px;
            width: 500px;
            padding: 50px;
            overflow: hidden;

            .title-container {
                position: relative;

                .title {
                    font-size: 1.3em;
                    color: var(--el-text-color-primary);
                    margin: 0 auto 30px;
                    font-weight: bold;
                }
            }
        }

        .el-form-item {
            margin-bottom: 24px;

            :deep(.el-input) {
                height: 48px;
                line-height: inherit;
                width: 100%;

                input {
                    height: 48px;
                }

                .el-input__prefix,
                .el-input__suffix {
                    display: flex;
                    align-items: center;
                }

                .el-input__prefix {
                    left: 10px;
                }

                .el-input__suffix {
                    right: 10px;
                }
            }
        }

        .flex-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .sub-link {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            font-size: 14px;
            color: var(--el-text-color-secondary);

            .text {
                margin-right: 10px;
            }
        }
    }

    .copyright {
        position: absolute;
        bottom: 20px;
        width: 100%;
        margin: 0;
    }
}
</style>
