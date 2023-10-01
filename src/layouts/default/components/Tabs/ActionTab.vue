<template>
    <el-dropdown placement="bottom" class="tab-action-dropdown" @command="handleCommand">
        <el-icon>
            <icon-ep-arrow-down-bold />
        </el-icon>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="(item, key) in btnTabs"
                    :key="key"
                    :disabled="item.disabled"
                    :command="item"
                    :divided="item.divided"
                >
                    <Icon :icon="item.icon" />
                    {{ item.text }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import { reactive, unref } from "vue";
import { tabsType } from "./type";
import Icon from "/@/components/Icon";
import { TabActionEnum } from "/@/enums/appEnum";
import { useTabs } from "/@/hooks/web/useTabs";

const { getRouteMultiTabs, refreshTab, closeCurrentTab, closeAllTab, closeOtherTab, closeLeftTab, closeRightTab } =
    useTabs();

const handleCommand = (command: any) => {
    if (command && command.disabled) return;

    switch (command.event) {
        case TabActionEnum.REFRESH:
            refreshTab();
            break;

        case TabActionEnum.CLOSE_CURRENT:
            closeCurrentTab();
            break;

        case TabActionEnum.CLOSE_ALL:
            closeAllTab();
            break;

        case TabActionEnum.CLOSE_OTHER:
            closeOtherTab();
            break;

        case TabActionEnum.CLOSE_LEFT:
            closeLeftTab();
            break;

        case TabActionEnum.CLOSE_RIGHT:
            closeRightTab();
            break;
    }
};

const btnTabs = reactive<Array<tabsType>>([
    {
        icon: "ep:refresh-right",
        text: "Reload",
        divided: false,
        disabled: false,
        show: true,
        event: TabActionEnum.REFRESH,
    },
    {
        icon: "line-md:close",
        text: "Close currentTab",
        divided: false,
        disabled: unref(getRouteMultiTabs).length > 1 ? false : true,
        show: true,
        event: TabActionEnum.CLOSE_CURRENT,
    },
    {
        icon: "line-md:arrow-close-left",
        text: "Close leftTab",
        divided: true,
        disabled: unref(getRouteMultiTabs).length > 1 ? false : true,
        show: true,
        event: TabActionEnum.CLOSE_LEFT,
    },
    {
        icon: "line-md:arrow-close-right",
        text: "Close rightTab",
        divided: false,
        disabled: unref(getRouteMultiTabs).length > 1 ? false : true,
        show: true,
        event: TabActionEnum.CLOSE_RIGHT,
    },

    {
        icon: "line-md:clipboard-arrow",
        text: "Close otherTab",
        divided: true,
        disabled: unref(getRouteMultiTabs).length > 2 ? false : true,
        show: true,
        event: TabActionEnum.CLOSE_OTHER,
    },
    {
        icon: "line-md:arrow-align-center",
        text: "Close allTabs",
        divided: false,
        disabled: unref(getRouteMultiTabs).length > 1 ? false : true,
        show: true,
        event: TabActionEnum.CLOSE_ALL,
    },
]);
</script>

<style lang="scss" scope>
.tab-action-dropdown {
    .el-icon {
        color: var(--el-text-color-primary);
    }
}
</style>
