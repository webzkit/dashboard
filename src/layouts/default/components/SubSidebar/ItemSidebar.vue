<template>
  <div class="sidebar-item">
    <el-sub-menu
      v-if="item.path === undefined"
      :title="t(item.meta.title)"
      :index="JSON.stringify(item)"
    >
      <template #title>
        <Icon v-if="item.meta.icon" :icon="item.meta.icon" class="title-icon" />
        <span class="title">{{ t(item.meta.title) }}</span>
      </template>
      <template v-for="route in item.children">
        <ItemSidebar
          v-if="route.meta?.sidebar !== false"
          :key="route.path"
          :item="route"
        />
      </template>
    </el-sub-menu>

    <router-link
      v-else-if="!hasChildren"
      v-slot="{ href, navigate, isActive, isExactActive }"
      custom
      :to="resolveRoutePath(basePath, item.path)"
    >
      <a
        :href="
          isExternalLink(resolveRoutePath(basePath, item.path))
            ? resolveRoutePath(basePath, item.path)
            : href
        "
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        :target="
          isExternalLink(resolveRoutePath(basePath, item.path))
            ? '_blank'
            : '_self'
        "
        @click="navigate"
      >
        <el-menu-item
          :title="t(item.meta.title)"
          :index="resolveRoutePath(basePath, item.path)"
        >
          <Icon
            v-if="item.meta.icon"
            :icon="item.meta.icon"
            class="title-icon"
          />
          <span class="title">{{ t(item.meta.title) }}</span>
        </el-menu-item>
      </a>
    </router-link>

    <el-sub-menu
      v-else
      :title="t(item.meta.title)"
      :index="resolveRoutePath(basePath, item.path)"
    >
      <template #title>
        <Icon v-if="item.meta.icon" :icon="item.meta.icon" class="title-icon" />
        <span class="title">{{ t(item.meta.title) }}</span>
      </template>
      <template v-for="route in item.children">
        <ItemSidebar
          v-if="route.meta.sidebar !== false"
          :key="route.path"
          :item="route"
          :base-path="resolveRoutePath(basePath, item.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { isExternalLink, resolveRoutePath } from '/@/utils';
import Icon from '/@/components/Icon';

const { t } = useI18n();

interface Props {
  item: any;
  basePath?: string;
}

const props = withDefaults(defineProps<Props>(), { basePath: '' });

const hasChildren = computed(() => {
  if (!props.item.children) {
    return false;
  }

  if (props.item.children.every((item: any) => item.meta.sidebar === false)) {
    return false;
  }

  return true;
});
</script>

<style lang="scss" scoped>
:deep(.el-menu-item),
:deep(.el-menu-item span.title),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu__title span.title) {
  flex: 1;
  vertical-align: inherit;
  @include text-overflow;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-sub-menu),
:deep(.el-menu-item) {
  .title-icon {
    width: 20px;
    font-size: 20px;
    vertical-align: -0.25em;
    transition: transform 0.3s;
    color: unset;
  }

  .title-icon + .title {
    margin-left: 10px;
  }

  &:hover > .title-icon,
  .el-sub-menu__title:hover > .title-icon {
    transform: scale(1.2);
  }
}

a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.el-sub-menu__title {
  > .badge {
    &-dot {
      right: 40px;
    }

    &-text {
      right: 40px;
    }
  }
}
</style>

<style lang="scss">
.el-menu--inline {
  background-color: var(--g-sub-sidebar-menu-bg) !important;

  .el-menu-item,
  .el-sub-menu > .el-sub-menu__title {
    color: var(--g-sub-sidebar-menu-color);
    background-color: var(--g-sub-sidebar-menu-bg) !important;

    &:hover {
      color: var(--g-sub-sidebar-menu-hover-color) !important;
      background-color: var(--g-sub-sidebar-menu-hover-bg) !important;
    }
  }
}

.el-menu-item,
.el-sub-menu__title {
  color: var(--g-sub-sidebar-menu-color) !important;
  background: transparent !important;

  &:hover {
    color: var(--g-sub-sidebar-menu-hover-color) !important;
    background-color: var(--g-sub-sidebar-menu-hover-bg) !important;
  }
}

.el-menu-item.is-active,
.el-menu--collapse .el-sub-menu.is-active > .el-sub-menu__title,
.el-sub-menu .el-menu--inline .el-menu-item.is-active {
  color: var(--g-sub-sidebar-menu-active-color) !important;
  background-color: var(--g-sub-sidebar-menu-active-bg) !important;

  .icon,
  .el-sub-menu__icon-arrow {
    color: unset;
  }
}
</style>
