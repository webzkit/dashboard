<template>
    <div class="tags-view-item" :class="[props.active ? 'active' : '']">
        <router-link :to="menu.path" v-if="menu.meta.title">
            {{ t(menu.meta.title) }}
        </router-link>
        <el-icon @click.stop="close" v-if="!menu.meta.hideClose" alt="delete tab">
            <icon-ep-close />
        </el-icon>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from "/@/hooks/web/useI18n";

const { t } = useI18n();
const emit = defineEmits(["close"]);

const props = defineProps({
    menu: {
        type: Object,
        default: () => {
            return {
                path: "",
                meta: {
                    title: "",
                    hideClose: false,
                },
            };
        },
    },

    active: {
        type: Boolean,
        default: false,
    },
});

const close = () => {
    emit("close");
};
</script>

<style lang="scss" scoped>
.tags-view-item {
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid var(--el-border-color);
    color: var(--el-text-color-primary);
    background: var(--el-background-color-page);
    padding: 0 8px;
    font-size: var(--el-font-size-small);
    margin-left: 5px;
    margin-top: 4px;

    a {
        color: var(--el-text-color-primary);
        height: 26px;
        display: inline-block;
        padding-left: 8px;
        padding-right: 8px;
        text-decoration: none;
    }

    .el-icon {
        font-size: 13px;
    }

    &:first-of-type {
        margin-left: 20px;
    }

    &:last-of-type {
        margin-right: 20px;
    }

    &.active {
        background: var(--el-color-primary-light-9);
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
        border-bottom-width: 2px;

        a {
            color: var(--el-color-primary);
        }

        &:hover {
            background: var(--el-color-primary-light-9);
        }
    }

    &:hover {
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);

        a {
            color: var(--el-color-primary);
        }
    }
}
</style>
