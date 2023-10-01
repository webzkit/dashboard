<template>
  <el-dropdown class="locale-picker">
    <Icon :icon="`ion:language-sharp`" />
    <template #dropdown>
      <el-dropdown-menu class="locale-dropdown">
        <template v-if="localeList" v-for="item in localeList">
          <el-dropdown-item :data-locale="item.locale" @click="handleClick(item.locale)">
            <el-icon>
              <icon-ep-check v-if="isCurrentLocale(item.locale)" />
            </el-icon>
            <span>
              {{ item.text }}
            </span>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<script lang="ts" setup>
import type { LocaleType } from '/#/config';
import { unref } from 'vue';
import Icon from '/@/components/Icon';
import { useLocale } from '/@/locales/useLocale';
import { localeList } from '/@/settings/localeSetting';


const { changeLocale, getLocale } = useLocale();
const isCurrentLocale = (locale: string) => unref(getLocale) === locale;
const toggleLocale = async (lang: LocaleType | string) => {
  if (!lang) return;

  await changeLocale(lang as LocaleType);
}

const handleClick = (val: LocaleType | string) => {
  if (unref(getLocale) === val) return;

  toggleLocale(val as string)
}
</script>

<style lang="scss">
.locale-picker {
  i {
    font-size: 19px;
    font-weight: bold;
    color: var(--el-color-primary-active);

    &:hover {
      cursor: pointer;
    }
  }
}

.locale-dropdown {
  li span {
    margin-left: 0.2rem;
  }
}
</style>

