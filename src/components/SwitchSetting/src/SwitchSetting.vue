<template>
  <div class="setting-item">
    <div class="label">{{ props.title }}</div>
    <!--style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" -->
    <el-switch :model-value="bindValue" @change="onChange" :disabled="getDisabled" inline-prompt :active-icon="Check"
      :inactive-icon="Close">
      <template slot="active-icon">
        <icon-ep-check />
      </template>
    </el-switch>
  </div>
</template>

<script setup lang="ts">
import { Check, Close } from "@element-plus/icons-vue";
import { computed } from "vue";
import { SettingTaskEnum } from "/@/layouts/default/components/AppSetting/enum";
import { handleSetting } from "/@/layouts/default/components/AppSetting/handle";


const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  def: {
    type: Boolean,
    default: false
  },
  event: {
    type: Number as PropType<SettingTaskEnum>
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const bindValue = computed(() => props.def);
const getDisabled = computed(() => props.disabled);

const onChange = function (value: boolean) {
  handleSetting(props.event, value)
}
</script>

<style lang="scss" scoped>
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background: var(--el-fill-color);
  }

  .label {
    font-size: 14px;
    color: var(--el-text-color-regular);
    display: flex;
    align-items: center;

    i {
      margin-left: 4px;
      font-size: 17px;
      color: var(--el-color-warning);
      cursor: help;
    }
  }

  .el-switch {
    height: auto;
  }
}
</style>
